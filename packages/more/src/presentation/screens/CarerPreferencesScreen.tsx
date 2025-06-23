import React, { FC } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Color,
  useI18n,
  Checkbox,
  FormField,
  Button,
  ButtonState,
  LabelStyle,
  GeneralStyle,
  GenericToast,
  Loader,
  Dropdown,
  PetType,
} from '@packages/common'
import { useCarerPreferencesViewModel } from '../viewModels/CarerPreferencesViewModel'

interface ConfigSectionProps {
  title: string
  checkboxEnabled: boolean
  onCheckboxPress: () => void
  fieldOnChangeText: (text: string) => void
  fieldPlaceholder: string
  fieldRightComponent?: React.ReactNode
  fieldValue: string
  fieldDisabled: boolean
}

const ConfigSection: React.FC<ConfigSectionProps> = React.memo(
  ({
    title,
    checkboxEnabled,
    onCheckboxPress,
    fieldOnChangeText,
    fieldPlaceholder,
    fieldRightComponent,
    fieldValue,
    fieldDisabled,
  }) => {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>{title}</Text>
          <Checkbox checked={checkboxEnabled} onPress={onCheckboxPress} />
        </View>
        <FormField
          placeholder={fieldPlaceholder}
          rightComponent={fieldRightComponent}
          value={fieldValue}
          onChangeText={fieldOnChangeText}
          secureTextEntry={false}
          disabled={fieldDisabled}
        />
      </View>
    )
  }
)

const CarerPreferencesScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const {
    state,
    setHomeCareEnabled,
    setHomeCareDailyPrice,
    setPetHomeCareEnabled,
    setPetHomeCareVisitPrice,
    setSelectedPetTypes,
    validateForm,
    savePreferences,
  } = useCarerPreferencesViewModel()

  const handleSave = async (): Promise<void> => {
    validateForm(async () => {
      savePreferences()
    })
  }

  const handlePetTypesSelection = (items: { value: string; label: string }[]) => {
    const selectedTypes = items
      .map((item) => state.petTypesDatasource.find((type) => type._id === item.value))
      .filter((type): type is PetType => type !== undefined)
    setSelectedPetTypes(selectedTypes)
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View>
          <ConfigSection
            title={t('carerPreferencesScreen.homeCare.label')}
            checkboxEnabled={state.homeCareEnabled}
            onCheckboxPress={setHomeCareEnabled}
            fieldOnChangeText={setHomeCareDailyPrice}
            fieldPlaceholder={t('carerPreferencesScreen.homeCare.placeholder')}
            fieldValue={state.homeCareDailyPrice}
            fieldDisabled={!state.homeCareEnabled}
            fieldRightComponent={
              <Text style={styles.price}>
                {t('carerPreferencesScreen.homeCare.price')}
              </Text>
            }
          />

          <ConfigSection
            title={t('carerPreferencesScreen.petHomeCare.label')}
            checkboxEnabled={state.petHomeCareEnabled}
            onCheckboxPress={setPetHomeCareEnabled}
            fieldOnChangeText={setPetHomeCareVisitPrice}
            fieldPlaceholder={t(
              'carerPreferencesScreen.petHomeCare.placeholder'
            )}
            fieldValue={state.petHomeCareVisitPrice}
            fieldDisabled={!state.petHomeCareEnabled}
            fieldRightComponent={
              <Text style={styles.price}>
                {t('carerPreferencesScreen.petHomeCare.price')}
              </Text>
            }
          />

          <View style={{ ...styles.section, paddingBottom: 32 }}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>
                {t('carerPreferencesScreen.petPreferences.label')}
              </Text>
            </View>
            <Dropdown
              data={state.petTypesDatasource.map((type) => ({
                value: type._id || '',
                label: type.name || '',
              }))}
              onFinishSelection={handlePetTypesSelection}
              placeholder={t(
                'carerPreferencesScreen.petPreferences.placeholder'
              )}
              allowsMultiSelection={true}
              initialValue={state.selectedPetTypes.map((type) => ({
                value: type._id || '',
                label: type.name || '',
              }))}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button.Primary
            title={t('carerPreferencesScreen.save')}
            onPress={handleSave}
            state={state.loading ? ButtonState.DISABLE : ButtonState.ENABLE}
          />
        </View>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  section: {
    ...GeneralStyle.card,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    ...LabelStyle.body({
      color: Color.black[700],
    }),
    flex: 1,
    marginRight: 12,
  },
  buttonContainer: {
    marginTop: 24,
  },
  price: {
    ...LabelStyle.body({
      color: Color.black[500],
      fontWeight: 300,
    }),
  },
})

export { CarerPreferencesScreen }
