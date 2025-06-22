import React, { FC } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Color,
  useI18n,
  Button,
  ButtonState,
  EmptyView,
  GeneralStyle,
  PPMaterialIcon,
} from '@packages/common'
import { useAddressesViewModel } from '../viewModels/AddressesViewModel'
import { StackActions, useNavigation } from '@react-navigation/native'

const AddressesScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { state } = useAddressesViewModel()

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        {/* Aquí irá la lista de direcciones */}
        {/* <View style={styles.addressList}></View> */}

        {/* {!state.loading && state.addresses.length === 0 && ( */}
        <EmptyView
          type="empty"
          title={t('addressesScreen.emptyState.title')}
          subtitle={t('addressesScreen.emptyState.subtitle')}
        />
        {/* )} */}
      </View>
      <TouchableOpacity
        style={{
          ...GeneralStyle.addFloatingButton,
          bottom: insets.bottom + 20,
        }}
        onPress={() => {
          navigation.dispatch(StackActions.push('addressNew'))
        }}
      >
        <PPMaterialIcon icon="add" size={30} color={'white'} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  content: {
    flex: 1,
  },
  addressList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButton: {
    marginTop: 16,
  },
})

export { AddressesScreen }
