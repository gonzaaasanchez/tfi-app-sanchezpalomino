import React, { FC, useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
} from '@packages/common'

type PetCharacteristic = {
  id: string
  name: string
  value: string
}

const mockPetTypes = [
  { value: '1', label: 'Perro' },
  { value: '2', label: 'Gato' },
  { value: '3', label: 'Ave' },
  { value: '4', label: 'Otro' },
]

const mockCharacteristics = [
  { value: '1', label: 'Tamaño' },
  { value: '2', label: 'Edad' },
  { value: '3', label: 'Personalidad' },
  { value: '4', label: 'Necesita medicación' },
]

const PetsNewScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [comment, setComment] = useState('')
  const [characteristics, setCharacteristics] = useState<PetCharacteristic[]>(
    []
  )
  const confirmationModalRef = useBottomSheetModalRef()

  const addCharacteristic = () => {
    setCharacteristics([...characteristics, { id: '', name: '', value: '' }])
  }

  const removeCharacteristic = (index: number) => {
    const newCharacteristics = [...characteristics]
    newCharacteristics.splice(index, 1)
    setCharacteristics(newCharacteristics)
  }

  const updateCharacteristic = (
    index: number,
    field: 'id' | 'name' | 'value',
    value: string
  ) => {
    const newCharacteristics = [...characteristics]
    newCharacteristics[index] = {
      ...newCharacteristics[index],
      [field]: value,
      ...(field === 'id' && {
        name: mockCharacteristics.find((c) => c.value === value)?.label || '',
      }),
    }
    setCharacteristics(newCharacteristics)
  }

  const handleSave = () => {
    confirmationModalRef.current?.present()
  }

  const handleTypeSelection = (value: any) => {
    if (!Array.isArray(value)) {
      setType(value.value)
    }
  }

  const handleCharacteristicSelection = (index: number, value: any) => {
    if (!Array.isArray(value)) {
      updateCharacteristic(index, 'id', value.value)
    }
  }

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
          value={name}
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
            data={mockPetTypes}
            placeholder={t('petsNewScreen.typePlaceholder')}
            onFinishSelection={handleTypeSelection}
          />
        </View>

        <FormField
          label={t('petsNewScreen.comment')}
          value={comment}
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
        {characteristics.map((char, index) => (
          <View key={index} style={styles.characteristicItem}>
            <View style={styles.characteristicInputs}>
              <Dropdown
                data={mockCharacteristics}
                placeholder={t('petsNewScreen.characteristicPlaceholder')}
                onFinishSelection={(value) =>
                  handleCharacteristicSelection(index, value)
                }
              />
              <FormField
                value={char.value}
                onChangeText={(value) =>
                  updateCharacteristic(index, 'value', value)
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
        <Button.Primary title={t('petsNewScreen.save')} onPress={handleSave} />
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
        onPrimaryAction={() => {}}
        onSecondaryAction={() => confirmationModalRef.current?.dismiss()}
      />
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
