import React, { FC, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Color,
  useI18n,
  GooglePlacesInput,
  FormField,
  Button,
  ButtonState,
  GenericToast,
  ShowToast,
  LabelStyle,
  Loader,
} from '@packages/common'
import { useAddressNewViewModel } from '../viewModels/AddressNewViewModel'

const AddressNewScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const { state, setAddress, setFloor, setApartment, saveAddress, setName } =
    useAddressNewViewModel()

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.formContainer}>
        <View>
          <FormField
            label={t('addressNewScreen.name')}
            placeholder={t('addressNewScreen.namePlaceholder')}
            value={state.name}
            onChangeText={setName}
          />

          <View style={styles.addressSection}>
            <Text style={styles.sectionLabel}>
              {t('addressNewScreen.address')}
            </Text>
            <GooglePlacesInput
              placeholder={t('addressNewScreen.addressPlaceholder')}
              onSelection={setAddress}
              onPress={() => {}}
            />
          </View>

          <View style={styles.additionalFields}>
            <FormField
              label={t('addressNewScreen.floor')}
              placeholder={t('addressNewScreen.floorPlaceholder')}
              value={state.floor}
              onChangeText={setFloor}
            />

            <FormField
              label={t('addressNewScreen.apartment')}
              placeholder={t('addressNewScreen.apartmentPlaceholder')}
              value={state.apartment}
              onChangeText={setApartment}
            />
          </View>
        </View>
        <Button.Primary
          title={t('addressNewScreen.saveAddress')}
          state={state.loading ? ButtonState.DISABLE : ButtonState.ENABLE}
          onPress={saveAddress}
          style={styles.saveButton}
        />
      </View>
      {state.loading && <Loader loading={state.loading} />}
      <GenericToast overrideOffset={10} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  addressSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    ...LabelStyle.body2({ fontWeight: 500, color: Color.black[700] }),
    marginBottom: 8,
  },
  additionalFields: {
    marginBottom: 32,
  },
  saveButton: {
    marginTop: 16,
  },
})

export { AddressNewScreen }
