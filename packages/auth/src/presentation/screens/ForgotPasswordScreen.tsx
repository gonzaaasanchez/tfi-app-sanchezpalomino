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
import { useForgotPasswordViewModel } from '../viewModels/ForgotPasswordViewModel'
import { useI18n } from '@app/common'

type Props = NativeStackScreenProps<ParamList, 'forgotPasswordScreen'>

/**
 * Forgot Password Screen component.
 *
 * This component allows users to request a password reset link via email.
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} Forgot Password Screen component.
 */
const ForgotPasswordScreen = ({ route }: Props): JSX.Element => {
  const { state, forgotPassword, setEmail } = useForgotPasswordViewModel()
  const { email } = route.params
  const { t } = useI18n()

  useLayoutEffect(() => {
    setEmail(email)
  }, [])

  useEffect(() => {
    if (state.error === 'forgot-password-missing-fields') {
      Alert.alert(
        t('forgotPasswordScreen.error.title'),
        t('forgotPasswordScreen.error.message')
      )
    } else if (state.error !== null) {
      Alert.alert(t('forgotPasswordScreen.error.title'), state.error)
    }
  }, [state.error])

  if (state.loading === true) {
    return (
      <View style={styles.loading}>
        <Text>{t('forgotPasswordScreen.loading')}</Text>
      </View>
    )
  }

  /**
   * Handles the password reset request.
   *
   * Calls the `forgotPassword` action and displays a success alert if the action is successful.
   *
   * @returns {Promise<void>}
   */
  const handlePasswordReset: () => Promise<void> = async () => {
    if (await forgotPassword()) {
      Alert.alert(
        t('forgotPasswordScreen.success.title'),
        t('forgotPasswordScreen.success.message', { email: state.email })
      )
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner} accessible={false}>
        <Text style={styles.title} testID="forgotPasswordScreen.title">
          {t('forgotPasswordScreen.title')}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t('forgotPasswordScreen.email')}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={state.email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          testID="forgotPasswordScreen.email"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handlePasswordReset}
          testID="forgotPasswordScreen.forgotPassword"
        >
          <Text style={styles.buttonText}>
            {t('forgotPasswordScreen.forgotPassword')}
          </Text>
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

export default ForgotPasswordScreen
