import React, { FC, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import {
  createUserSchema,
  UserFormData,
  FormField,
  Button,
  Color,
  LabelStyle,
  useI18n,
  AppState,
  PPMaterialIcon,
} from '@packages/common'

const ProfileScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const user = useSelector((state: AppState) => state.app.user)

  useEffect(() => {
    console.log(user)
  }, [user])

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

  const onSubmit = (data: UserFormData) => {
    console.log(data)
    // Handle form submission
  }

  return (
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
            {user?.avatar && (
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                style={styles.avatar}
              />
            )}
            {!user?.avatar && (
              <View style={styles.avatar}>
                <PPMaterialIcon
                  icon="pets"
                  size={40}
                  color={Color.brand1[700]}
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.editAvatarButton}
              activeOpacity={0.85}
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

          <View style={{paddingBottom: 50}}>
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
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Color.brand1[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.brand1[300],
  },
  editAvatarButton: {
    marginVertical: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: Color.brand2[50],
    borderRadius: 20,
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
