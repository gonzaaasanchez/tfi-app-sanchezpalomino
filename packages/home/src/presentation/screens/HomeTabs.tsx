import React, { FC, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native'
import {
  Color,
  LabelStyle,
  PPBottomSheetContainer,
  useI18n,
} from '@packages/common'
import { useNavigation } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

type Props = { feed?: FC; reserves?: FC; services?: FC; more?: FC }

const indicatorWidth = 32
const focusedColor = Color.brand1[800]
const unfocusedColor = Color.brand1[400]

const HomeTabs: FC<Props> = ({
  feed,
  reserves,
  services,
  more,
}): JSX.Element => {
  const { t } = useI18n()
  const navigation = useNavigation()

  const insets = useSafeAreaInsets()
  const indicatorPosition = useRef(new Animated.Value(0)).current
  const tabRefs = useRef<{ [key: string]: { x: number; width: number } }>({})

  const handleIndicatorPosition = (index: number) => {
    const tab = tabRefs.current[Object.keys(tabRefs.current)[index]]
    if (tab) {
      const tabCenterX = tab.x + tab.width / 2
      const adjustedPosition = tabCenterX - indicatorWidth / 2
      Animated.spring(indicatorPosition, {
        toValue: adjustedPosition,
        useNativeDriver: true,
      }).start()
    }
  }

  return (
    <PPBottomSheetContainer>
      <Tab.Navigator
        id={navigation.getParent()}
        tabBar={({ state, descriptors, navigation }) => (
          <View style={[styles.tabBar, { bottom: insets.bottom + 10 }]}>
            {/* Tabs */}
            <View style={[styles.mainContainer, styles.shadow]}>
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const isFocused = state.index === index
                const label = options.tabBarLabel as string
                const icon = options.tabBarIcon?.({
                  focused: isFocused,
                  color: isFocused ? focusedColor : unfocusedColor,
                  size: 24,
                })

                return (
                  <TouchableOpacity
                    key={route.key}
                    activeOpacity={0.7}
                    style={styles.tabItemWrapper}
                    onPress={() => {
                      handleIndicatorPosition(index)
                      navigation.navigate(route.name)
                    }}
                    onLayout={(event) => {
                      // Adjust initial tab layout
                      const { x, width } = event.nativeEvent.layout
                      tabRefs.current[route.name] = { x, width }
                      index === 0 && handleIndicatorPosition(0)
                    }}
                  >
                    {icon}
                    <View style={styles.tabLabelContainer}>
                      <Text
                        style={{
                          ...styles.tabLabelCommon,
                          ...(isFocused && styles.tabLabelSelected),
                          ...(!isFocused && styles.tabLabelUnselected),
                        }}
                      >
                        {label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>

            {/* Animated Indicator */}
            <Animated.View
              style={[
                styles.indicatorContainer,
                { transform: [{ translateX: indicatorPosition }] },
              ]}
            >
              <View style={styles.indicator} />
            </Animated.View>
          </View>
        )}
      >
        {/* Tab Screens */}

        {/* borrame */}
        {reserves && (
          <Tab.Screen
            name="reserves"
            component={reserves}
            options={{
              headerShown: false,
              tabBarLabel: t('tabbar.reserves'),
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  // name="book-account-outline"
                  name="book-account-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        )}
        {/* borrame */}

        {feed && (
          <Tab.Screen
            name="feed"
            component={feed}
            options={{
              headerShown: false,
              tabBarLabel: t('tabbar.feed'),
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="home-variant-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        )}
        {/* {reserves && (
        <Tab.Screen
          name="reserves"
          component={reserves}
          options={{
            headerShown: false,
            tabBarLabel: t('tabbar.reserves'),
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                // name="book-account-outline"
                name="book-account-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      )} */}
        {services && (
          <Tab.Screen
            name="services"
            component={services}
            options={{
              headerShown: false,
              tabBarLabel: t('tabbar.services'),
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="shopping-search"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        )}
        {more && (
          <Tab.Screen
            name="more"
            component={more}
            options={{
              headerShown: false,
              tabBarLabel: t('tabbar.more'),
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="dots-horizontal-circle-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    left: 20,
    right: 20,
    height: 82,
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  shadow: {
    shadowColor: Color.black[500],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  indicatorContainer: {
    position: 'absolute',
    height: 4,
    width: indicatorWidth,
    borderRadius: 4,
    top: 0,
  },
  indicator: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
    backgroundColor: focusedColor,
  },
  tabItemWrapper: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabLabelContainer: { alignItems: 'center', justifyContent: 'center' },
  tabLabelCommon: {
    marginTop: 5,
    ...LabelStyle.subhead({ textAlign: 'center' }),
  },
  tabLabelUnselected: { color: unfocusedColor },
  tabLabelSelected: {
    ...LabelStyle.subhead({ fontWeight: 500, color: focusedColor }),
  },
})

export { HomeTabs }
