import {
  Color,
  PPMaterialIcon,
  PPMaterialIconsName,
  LabelStyle,
  GeneralStyle,
  useI18n,
  useBottomSheetModalRef,
  PPBottomSheet,
  HomeTabsHeight,
  Loader,
} from '@packages/common'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useMoreViewModel } from '../viewModels/MoreViewModel'
import { SafeAreaView } from 'react-native-safe-area-context'

const MoreScreen: FC = (): JSX.Element => {
  const navigation = useNavigation()
  const { t } = useI18n()
  const { logout, state } = useMoreViewModel()
  const logoutModalRef = useBottomSheetModalRef()

  const menuItems: Array<{
    title: string
    icon: PPMaterialIconsName
    screen?: string
    testID: string
    onPress?: () => void
  }> = [
    {
      title: t('profileScreen.title'),
      icon: 'person-outline',
      screen: 'profile',
      testID: 'moreScreen.profile',
    },
    {
      title: t('petsScreen.title'),
      icon: 'paw-outline',
      screen: 'pets',
      testID: 'moreScreen.pets',
    },
    {
      title: t('addressesScreen.title'),
      icon: 'home-outline',
      screen: 'addresses',
      testID: 'moreScreen.addresses',
    },
    {
      title: t('carerPreferencesScreen.title'),
      icon: 'tune',
      screen: 'carerPreferences',
      testID: 'moreScreen.carerPreferences',
    },
    {
      title: t('moreScreen.menu.logout'),
      icon: 'logout',
      testID: 'moreScreen.logout',
      onPress: () => logoutModalRef.current?.present(),
    },
  ]

  return (
    <SafeAreaView
      style={{ ...styles.container, paddingBottom: HomeTabsHeight }}
      edges={['bottom']}
    >
      {menuItems.map((item) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={item.screen || item.title}
          style={styles.menuItem}
          onPress={
            item.onPress ||
            (() => navigation.dispatch(StackActions.push(item.screen!)))
          }
          testID={item.testID}
        >
          <View style={styles.iconContainer}>
            <PPMaterialIcon
              icon={item.icon}
              size={24}
              color={Color.brand1[700]}
            />
          </View>
          <Text style={styles.menuItemText}>{item.title}</Text>
          <View style={styles.iconContainer} />
        </TouchableOpacity>
      ))}
      <PPBottomSheet.Dialog
        ref={logoutModalRef}
        title={t('moreScreen.logoutModal.title')}
        subtitle={t('moreScreen.logoutModal.subtitle')}
        primaryActionTitle={t('moreScreen.logoutModal.primaryAction')}
        onPrimaryAction={logout}
        onSecondaryAction={logoutModalRef.current?.dismiss}
        secondaryActionTitle={t('moreScreen.logoutModal.secondaryAction')}
      />
      {state.loading && <Loader loading={state.loading} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
    padding: 20,
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
