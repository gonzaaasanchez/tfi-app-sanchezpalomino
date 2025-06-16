import React, { FC } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  createUserSchema,
  UserFormData,
  UserModel,
  FormField,
  Button,
  Color,
  LabelStyle,
  useI18n,
} from '@packages/common'

const ProfileScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  
  // Mock user data - replace with actual user data from your state management
  const mockUser = new UserModel({
    firstname: 'Gonzalo',
    lastname: 'Sanchez',
    phoneNumber: '+5493415891365',
    avatar: 'https://picsum.photos/200?random=3',
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(createUserSchema(t)),
    defaultValues: {
      firstname: mockUser.firstname,
      lastname: mockUser.lastname,
      phoneNumber: mockUser.phoneNumber,
      avatar: mockUser.avatar,
    },
  })

  const onSubmit = (data: UserFormData) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: mockUser.avatar }}
            resizeMode="cover"
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.editAvatarButton}
            activeOpacity={0.85}
          >
            <Text style={LabelStyle.body2({ fontWeight: 600, color: Color.black[600] })}>
              {t('profileScreen.editPhoto')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 20 }}>
          <Controller
            control={control}
            name="firstname"
            render={({ field: { onChange, value } }) => (
              <FormField
                label={t('profileScreen.firstName')}
                value={value || ''}
                onChangeText={onChange}
                error={errors.firstname?.message}
                placeholder={t('profileScreen.firstNamePlaceholder')}
              />
            )}
          />

          <Controller
            control={control}
            name="lastname"
            render={({ field: { onChange, value } }) => (
              <FormField
                label={t('profileScreen.lastName')}
                value={value || ''}
                onChangeText={onChange}
                error={errors.lastname?.message}
                placeholder={t('profileScreen.lastNamePlaceholder')}
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
    borderWidth: 3,
    borderColor: Color.brand2[300],
  },
  editAvatarButton: {
    margin: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: Color.brand2[50],
    borderRadius: 20,
  },
})

export { ProfileScreen }
