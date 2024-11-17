import React, { FC, useEffect } from 'react'
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
import { StackActions, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ParamList } from '../AuthStack'
import { useLoginViewModel } from '../viewModels/LoginViewModel'
import { useI18n } from '@app/common'

type Props = NativeStackScreenProps<ParamList, 'loginScreen'>

/**
 * LoginScreen component.
 *
 * This component renders a login screen that allows users to enter their email and password,
 * and then log in or navigate to registration or forgot password screens.
 *
 * @returns {JSX.Element} The login screen component.
 */
const LoginScreen: FC<Props> = () => {
  const { state, login, setEmail, setPassword } = useLoginViewModel()
  const navigation = useNavigation()
  const { t } = useI18n()

  /**
   * Logs in the user with the current email and password state.
   *
   * If the login is successful, navigates to the home screen.
   * If the login fails, displays an error alert.
   */
  const handleLogin: () => void = () => {
    login()
  }

  useEffect(() => {
    if (state.error === 'login-missing-fields') {
      Alert.alert(t('loginScreen.error.title'), t('loginScreen.error.message'))
      return
    } else if (state.error !== null) {
      Alert.alert(t('loginScreen.error.title'), state.error)
    }
  }, [state.error])

  if (state.loading === true) {
    return (
      <View style={styles.loading}>
        <Text>{t('loginScreen.loading')}</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner} accessible={false}>
        <Text testID="loginScreen.title" style={styles.title}>
          {t('loginScreen.title')}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t('loginScreen.email')}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={state.email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          testID="loginScreen.email"
        />

        <TextInput
          style={styles.input}
          placeholder={t('loginScreen.password')}
          placeholderTextColor="#aaa"
          secureTextEntry
          value={state.password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType={'oneTimeCode'}
          testID="loginScreen.password"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          testID="loginScreen.login"
        >
          <Text style={styles.buttonText}>{t('loginScreen.login')}</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                StackActions.push('registerScreen', {
                  email: state.email,
                })
              )
            }
            testID="loginScreen.register"
          >
            <Text style={styles.linkText}>{t('loginScreen.register')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                StackActions.push('forgotPasswordScreen', {
                  email: state.email,
                })
              )
            }
            testID="loginScreen.forgotPassword"
          >
            <Text style={styles.linkText}>
              {t('loginScreen.forgotPassword')}
            </Text>
          </TouchableOpacity>
        </View>
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
  linkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#007bff',
    marginVertical: 8,
  },
})

export default LoginScreen
