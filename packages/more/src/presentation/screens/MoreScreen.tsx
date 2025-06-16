import { Color, PPMaterialIcon, PPMaterialIconsName, LabelStyle, GeneralStyle, useI18n } from '@packages/common'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MoreScreen: FC = (): JSX.Element => {
  const navigation = useNavigation()
  const { t } = useI18n()

  const menuItems: Array<{
    title: string
    icon: PPMaterialIconsName
    screen: string
    testID: string
  }> = [
    {
      title: t('moreScreen.menu.profile'),
      icon: 'person-outline',
      screen: 'profile',
      testID: 'moreScreen.profile',
    },
    {
      title: t('moreScreen.menu.pets'),
      icon: 'paw-outline',
      screen: 'pets',
      testID: 'moreScreen.pets',
    },
    {
      title: t('moreScreen.menu.addresses'),
      icon: 'home-outline',
      screen: 'addresses',
      testID: 'moreScreen.addresses',
    },
  ]

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={item.screen}
          style={styles.menuItem}
          onPress={() => navigation.dispatch(StackActions.push(item.screen))}
          testID={item.testID}
        >
          <View style={styles.iconContainer}>
            <PPMaterialIcon icon={item.icon} size={24} color={Color.brand1[700]} />
          </View>
          <Text style={styles.menuItemText}>{item.title}</Text>
          <View style={styles.iconContainer} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
    padding: 20,
    paddingBottom: 100,
    justifyContent: 'center',
  },
  title: {
    ...LabelStyle.title1({ textAlign: 'center' }),
    marginBottom: 24,
  },
  menuItem: {
    ...GeneralStyle.card,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuItemText: {
    ...LabelStyle.body({ color: Color.black[800] }),
    flex: 1,
    textAlign: 'center',
  },
})

export { MoreScreen }
