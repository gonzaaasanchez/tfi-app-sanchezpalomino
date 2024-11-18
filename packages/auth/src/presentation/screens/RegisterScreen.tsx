import React, { useEffect, useLayoutEffect } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { ParamList } from '../AuthStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRegisterViewModel } from '../viewModels/RegisterViewModel'
import { Button, Color, Loader, useI18n } from '@app/common'

type Props = NativeStackScreenProps<ParamList, 'registerScreen'>

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
    } else if (state.error === 'register-invalid-email') {
      Alert.alert(
        t('registerScreen.error.title'),
        t('registerScreen.error.emailMessage')
      )
    } else if (state.error !== null) {
      Alert.alert(t('registerScreen.error.title'), state.error)
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
            placeholder={t('registerScreen.name')}
            placeholderTextColor={Color.black[400]}
            value={state.name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            testID="registerScreen.name"
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
    backgroundColor: Color.brand2[200],
  },
  keyboardContainer: {
    flex: 1,
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
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Color.brand2[50],
    fontFamily: 'SourGummy-Regular',
    // borderColor: Color.brand2[200],
    // borderWidth: 1,
    // backgroundColor: 'white',
  },
})

export default RegisterScreen
