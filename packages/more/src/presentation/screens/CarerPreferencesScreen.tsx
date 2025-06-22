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
} from '@packages/common'
import { useCarerPreferencesViewModel } from '../viewModels/CarerPreferencesViewModel'

const CarerPreferencesScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const {
    state,
    setHomeCareEnabled,
    setHomeCareDailyPrice,
    setPetHomeCareEnabled,
    setPetHomeCareVisitPrice,
    validateForm,
    savePreferences,
  } = useCarerPreferencesViewModel()

  const handleSave = async (): Promise<void> => {
    validateForm(async () => {
      savePreferences()
    })
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {t('carerPreferencesScreen.description')}
          </Text>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>
                {t('carerPreferencesScreen.homeCare.label')}
              </Text>
              <Checkbox
                checked={state.homeCareEnabled}
                onPress={setHomeCareEnabled}
              />
            </View>
            <FormField
              placeholder={t('carerPreferencesScreen.homeCare.placeholder')}
              value={state.homeCareDailyPrice}
              onChangeText={setHomeCareDailyPrice}
              secureTextEntry={false}
              disabled={!state.homeCareEnabled}
            />
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>
                {t('carerPreferencesScreen.petHomeCare.label')}
              </Text>
              <Checkbox
                checked={state.petHomeCareEnabled}
                onPress={setPetHomeCareEnabled}
              />
            </View>
            <FormField
              placeholder={t('carerPreferencesScreen.petHomeCare.placeholder')}
              value={state.petHomeCareVisitPrice}
              onChangeText={setPetHomeCareVisitPrice}
              secureTextEntry={false}
              disabled={!state.petHomeCareEnabled}
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
  title: {
    ...LabelStyle.body({
      fontWeight: 300,
      color: Color.black[700],
    }),
    marginBottom: 32,
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
})

export { CarerPreferencesScreen }
