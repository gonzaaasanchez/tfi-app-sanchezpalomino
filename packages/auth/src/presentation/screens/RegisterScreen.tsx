import React, { useEffect, useLayoutEffect } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { ParamList } from '../AuthStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRegisterViewModel } from '../viewModels/RegisterViewModel'
import { Button, Color, Loader, ShowToast, useI18n } from '@app/common'

type Props = NativeStackScreenProps<ParamList, 'registerScreen'>

const RegisterScreen = ({ route }: Props): JSX.Element => {
  const {
    state,
    createUser,
    setEmail,
    setPassword,
    setConfirmPassword,
    setFirstName,
    setLastName,
  } = useRegisterViewModel()
  const { email } = route.params
  const { t } = useI18n()

  useLayoutEffect(() => {
    setEmail(email)
  }, [])

  const handleRegister: () => Promise<void> = async () => {
    if (await createUser()) {
      ShowToast({
        config: 'success',
        title: t('registerScreen.success.title'),
        subtitle: t('registerScreen.success.message'),
      })
    }
  }

  useEffect(() => {
    if (state.error === 'register-missing-fields') {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t('registerScreen.error.missingFields'),
      })
      return
    } else if (state.error === 'register-invalid-password') {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t('registerScreen.error.invalidPassword'),
      })
      return
    } else if (state.error === 'register-password-not-match') {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t('registerScreen.error.passwordNotMatch'),
      })
      return
    } else if (state.error === 'register-invalid-email') {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t('registerScreen.error.emailMessage'),
      })
      return
    } else if (state.error !== null) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: state.error,
      })
      return
    }
  }, [state.error])

  return (
    <View style={styles.fullScreenContainer}>
      {state.loading && <Loader loading={state.loading} />}
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inner} accessible={false}>
          <TextInput
            style={styles.input}
            placeholder={t('registerScreen.firstName')}
            placeholderTextColor={Color.black[400]}
            value={state.firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            autoCorrect={false}
            testID="registerScreen.firstName"
          />

          <TextInput
            style={styles.input}
            placeholder={t('registerScreen.lastName')}
            placeholderTextColor={Color.black[400]}
            value={state.lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            autoCorrect={false}
            testID="registerScreen.lastName"
          />

          <TextInput
            style={styles.input}
            placeholder={t('registerScreen.email')}
            placeholderTextColor={Color.black[400]}
            keyboardType="email-address"
            value={state.email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            testID="registerScreen.email"
          />

          <TextInput
            style={styles.input}
            placeholder={t('registerScreen.password')}
            placeholderTextColor={Color.black[400]}
            secureTextEntry
            value={state.password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType={'oneTimeCode'}
            testID="registerScreen.password"
          />

          <TextInput
            style={styles.input}
            placeholder={t('registerScreen.confirmPassword')}
            placeholderTextColor={Color.black[400]}
            secureTextEntry
            value={state.confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType={'oneTimeCode'}
            testID="registerScreen.confirmPassword"
          />

          <Button.Primary
            title={t('registerScreen.register')}
            onPress={handleRegister}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: Color.authBackground,
  },
  keyboardContainer: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Color.brand2[50],
    fontFamily: 'SourGummy-Regular',
  },
})

export default RegisterScreen
