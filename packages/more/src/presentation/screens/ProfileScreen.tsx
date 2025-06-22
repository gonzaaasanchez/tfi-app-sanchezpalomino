import React, { FC } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  createUserSchema,
  UserFormData,
  FormField,
  Button,
  Color,
  LabelStyle,
  useI18n,
  Loader,
  GenericToast,
  PPBottomSheetContainer,
  PPBottomSheet,
  useBottomSheetModalRef,
  ImagePickerOptions,
  ImageWithPlaceholder,
  getImageFullUrl,
} from '@packages/common'
import { useProfileViewModel } from '../viewModels/ProfileViewModel'

const ProfileScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const { user, baseUrl, state, updateProfile, selectImageFrom } =
    useProfileViewModel()
  const imagePickerModalRef = useBottomSheetModalRef()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(createUserSchema(t)),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      avatar: user?.avatar || '',
    },
  })

  const handleImageSelection = (source: 'camera' | 'gallery') => {
    imagePickerModalRef.current?.dismiss()
    selectImageFrom(source)
  }

  const getAvatarUrl = (): string | null => {
    if (state.newAvatarFile) {
      return state.newAvatarFile
    }
    const avatarUrl = getImageFullUrl(user?.avatar, baseUrl)
    if (!avatarUrl) return null
    // Agregar timestamp para evitar cache
    return `${avatarUrl}?_t=${Date.now()}`
  }

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.avatarContainer}>
              <ImageWithPlaceholder source={getAvatarUrl()} dimension={140} />
              <TouchableOpacity
                style={styles.editAvatarButton}
                activeOpacity={0.85}
                onPress={() => imagePickerModalRef.current?.present()}
              >
                <Text
                  style={LabelStyle.body2({
                    fontWeight: 600,
                    color: Color.black[600],
                  })}
                >
                  {t('profileScreen.editPhoto')}
                </Text>
              </TouchableOpacity>
            </View>

            {state.error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{state.error}</Text>
              </View>
            )}

            <View style={{ paddingBottom: 50 }}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <FormField
                    label={t('profileScreen.firstName')}
                    value={value || ''}
                    onChangeText={onChange}
                    error={errors.firstName?.message}
                    placeholder={t('profileScreen.firstNamePlaceholder')}
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <FormField
                    label={t('profileScreen.lastName')}
                    value={value || ''}
                    onChangeText={onChange}
                    error={errors.lastName?.message}
                    placeholder={t('profileScreen.lastNamePlaceholder')}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <FormField
                    label={t('profileScreen.email')}
                    value={value || ''}
                    onChangeText={onChange}
                    error={errors.email?.message}
                    placeholder={t('profileScreen.emailPlaceholder')}
                  />
                )}
              />

              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <FormField
                    label={t('profileScreen.phone')}
                    value={value || ''}
                    onChangeText={onChange}
                    error={errors.phoneNumber?.message}
                    placeholder={t('profileScreen.phonePlaceholder')}
                  />
                )}
              />
            </View>

            <Button.Primary
              title={t('profileScreen.saveChanges')}
              onPress={handleSubmit(updateProfile)}
              loading={state.loading}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        {state.loading && <Loader loading={state.loading} />}
        <GenericToast overrideOffset={10} />
        <PPBottomSheet.Empty ref={imagePickerModalRef} dismisseable={true}>
          <ImagePickerOptions
            handleImageSelection={handleImageSelection}
            onDismiss={() => imagePickerModalRef.current?.dismiss()}
          />
        </PPBottomSheet.Empty>
      </SafeAreaView>
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.brand2[100],
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 24,
  },
  editAvatarButton: {
    marginVertical: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: Color.brand2[50],
    borderRadius: 20,
  },
  errorContainer: {
    backgroundColor: Color.brand2[100],
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: Color.brand1[700],
    fontSize: 14,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})

export { ProfileScreen }
