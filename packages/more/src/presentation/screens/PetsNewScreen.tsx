import React, { FC, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import {
  Color,
  LabelStyle,
  PPMaterialIcon,
  FormField,
  Dropdown,
  Button,
  useI18n,
  PPBottomSheetContainer,
  PPBottomSheet,
  useBottomSheetModalRef,
  GenericToast,
  Loader,
} from '@packages/common'
import { usePetsNewViewModel } from '../viewModels/PetsNewViewModel'
import catSuccess from '@app/assets/lottie-json/success-cat.json'

const PetsNewScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const navigation = useNavigation()
  const {
    state,
    setName,
    setComment,
    addCharacteristic,
    removeCharacteristic,
    setCharacteristicValue,
    setType,
    setCharacteristicType,
    validateForm,
    savePet,
  } = usePetsNewViewModel()

  const confirmationModalRef = useBottomSheetModalRef()
  const successModalRef = useBottomSheetModalRef()

  useEffect(() => {
    if (state.petSaved) {
      successModalRef.current?.present()
    }
  }, [state.petSaved])

  const Avatar = () => {
    return (
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <PPMaterialIcon icon="pets" size={40} color={Color.brand1[700]} />
        </View>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>{t('profileScreen.editPhoto')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const MainForm = () => {
    return (
      <View style={{ gap: 5 }}>
        <FormField
          label={t('petsNewScreen.name')}
          value={state.pet.name || ''}
          onChangeText={setName}
          placeholder={t('petsNewScreen.namePlaceholder')}
        />

        <View style={{ marginBottom: 16 }}>
          <Text
            style={LabelStyle.body2({
              fontWeight: 500,
              color: Color.black[700],
            })}
          >
            {t('petsNewScreen.type')}
          </Text>
          <Dropdown
            data={state.petTypesDatasource.map((type) => ({
              value: type.id || '',
              label: type.name || '',
            }))}
            placeholder={t('petsNewScreen.typePlaceholder')}
            onFinishSelection={setType}
            initialValue={
              state.pet.type
                ? {
                    value: state.pet.type.id || '',
                    label: state.pet.type.name || '',
                  }
                : undefined
            }
          />
        </View>

        <FormField
          label={t('petsNewScreen.comment')}
          value={state.pet.comment || ''}
          onChangeText={setComment}
          placeholder={t('petsNewScreen.commentPlaceholder')}
        />
      </View>
    )
  }

  const CharacteristicsForm = () => {
    return (
      <View style={styles.characteristicsContainer}>
        <Text style={styles.sectionTitle}>
          {t('petsNewScreen.characteristics')}
        </Text>
        {(state.pet.characteristics || []).map((char, index) => (
          <View key={index} style={styles.characteristicItem}>
            <View style={styles.characteristicInputs}>
              <Dropdown
                data={state.characteristicsDatasource.map((char) => ({
                  value: char.id || '',
                  label: char.name || '',
                }))}
                placeholder={t('petsNewScreen.characteristicPlaceholder')}
                onFinishSelection={(value) =>
                  setCharacteristicType(index, value)
                }
                initialValue={
                  state.pet.characteristics?.[index]?.id
                    ? {
                        value: state.pet.characteristics[index].id || '',
                        label: state.pet.characteristics[index].name || '',
                      }
                    : undefined
                }
              />
              <FormField
                value={char.value || ''}
                onChangeText={(value) =>
                  setCharacteristicValue(index, 'value', value)
                }
                placeholder={t('petsNewScreen.valuePlaceholder')}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.removeButton}
              onPress={() => removeCharacteristic(index)}
            >
              <PPMaterialIcon icon="delete" size={24} color={Color.red[500]} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addButton}
          onPress={addCharacteristic}
        >
          <PPMaterialIcon icon="add" size={24} color={Color.brand1[700]} />
          <Text style={styles.addButtonText}>
            {t('petsNewScreen.addCharacteristic')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const SaveButton = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <Button.Primary
          title={t('petsNewScreen.save')}
          onPress={() =>
            validateForm(() => confirmationModalRef.current?.present())
          }
        />
      </View>
    )
  }

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Avatar />
          <MainForm />
          <CharacteristicsForm />
        </ScrollView>
        <SaveButton />
      </SafeAreaView>
      <PPBottomSheet.Dialog
        ref={confirmationModalRef}
        title={t('petsNewScreen.confirmation.title')}
        subtitle={t('petsNewScreen.confirmation.subtitle')}
        primaryActionTitle={t('petsNewScreen.confirmation.confirm')}
        secondaryActionTitle={t('petsNewScreen.confirmation.cancel')}
        onPrimaryAction={() => {
          confirmationModalRef.current?.dismiss()
          savePet()
        }}
        onSecondaryAction={() => confirmationModalRef.current?.dismiss()}
      />
      <PPBottomSheet.Dialog
        ref={successModalRef}
        title={t('petsNewScreen.success.title')}
        subtitle={t('petsNewScreen.success.subtitle')}
        lottieFile={catSuccess}
        onPrimaryAction={() => navigation.goBack()}
      />
      {state.loading && <Loader loading={state.loading} opacity={0.85}/>}
      <GenericToast overrideOffset={10} />
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.brand2[100],
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Color.brand1[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.brand1[300],
  },
  uploadButton: {
    margin: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: Color.brand2[50],
    borderRadius: 20,
  },
  uploadText: {
    ...LabelStyle.body2({ fontWeight: 600, color: Color.black[600] }),
  },
  characteristicsContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    ...LabelStyle.title3({ color: Color.black[700] }),
    marginBottom: 12,
  },
  characteristicItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  characteristicInputs: {
    flex: 1,
    gap: 10,
  },
  removeButton: {
    padding: 8,
    paddingTop: 18,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    ...LabelStyle.body({ color: Color.brand1[700] }),
    marginLeft: 8,
  },
})

export { PetsNewScreen }
