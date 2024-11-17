import React, { useEffect, useLayoutEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { ParamList } from '../AuthStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRegisterViewModel } from '../viewModels/RegisterViewModel'
import { useI18n } from '@app/common'

type Props = NativeStackScreenProps<ParamList, 'registerScreen'>

/**
 * RegisterScreen component.
 *
 * This component renders a registration screen that allows users to enter their
 * name, email, password and confirm password, and then log in or navigate to login
 * screen.
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered RegisterScreen component.
 */
const RegisterScreen = ({ route }: Props): JSX.Element => {
  const {
    state,
    createUser,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
  } = useRegisterViewModel()

  const { email } = route.params
  const { t } = useI18n()

  /**
   * Handles the register button press.
   *
   * Calls the createUser function from the useRegisterViewModel hook. If the
   * createUser function succeeds, it displays a success alert.
   *
   * @returns {Promise<void>}
   */
  const handleRegister: () => Promise<void> = async () => {
    if (await createUser()) {
      Alert.alert(
        t('registerScreen.success.title'),
        t('registerScreen.success.message')
      )
    }
  }

  useLayoutEffect(() => {
    setEmail(email)
  }, [])

  useEffect(() => {
    if (state.error === 'register-missing-fields') {
      Alert.alert(
        t('registerScreen.error.title'),
        t('registerScreen.error.missingFields')
      )
    } else if (state.error === 'register-password-not-match') {
      Alert.alert(
        t('registerScreen.error.title'),
        t('registerScreen.error.passwordNotMatch')
      )
    } else if (state.error !== null) {
      Alert.alert(t('registerScreen.error.title'), state.error)
    }
  }, [state.error])

  if (state.loading === true) {
    return (
      <View style={styles.loading}>
        <Text>{t('registerScreen.loading')}</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner} accessible={false}>
        <Text style={styles.title} testID="registerScreen.title">
          {t('registerScreen.title')}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t('registerScreen.name')}
          placeholderTextColor="#aaa"
          value={state.name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
          testID="registerScreen.name"
        />

        <TextInput
          style={styles.input}
          placeholder={t('registerScreen.email')}
          placeholderTextColor="#aaa"
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
          placeholderTextColor="#aaa"
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
          placeholderTextColor="#aaa"
          secureTextEntry
          value={state.confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType={'oneTimeCode'}
          testID="registerScreen.confirmPassword"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          testID="registerScreen.register"
        >
          <Text style={styles.buttonText}>{t('registerScreen.register')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 48,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default RegisterScreen
