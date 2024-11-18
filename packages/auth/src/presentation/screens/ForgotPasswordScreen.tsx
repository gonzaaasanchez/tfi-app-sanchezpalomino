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
import { Button, Color, LabelStyle, useI18n } from '@app/common'

type Props = NativeStackScreenProps<ParamList, 'forgotPasswordScreen'>

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
        <Text style={{ ...LabelStyle.body2, ...styles.title }}>
          {t('forgotPasswordScreen.instructions')}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t('forgotPasswordScreen.email')}
          placeholderTextColor={Color.black[400]}
          keyboardType="email-address"
          value={state.email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />

        <Button.Primary
          title={t('forgotPasswordScreen.button')}
          onPress={handlePasswordReset}
        />
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
    backgroundColor: Color.brand2[200],
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    paddingBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Color.brand2[50],
    // borderColor: Color.brand2[200],
    // borderWidth: 1,
    // backgroundColor: 'white',
  },
})

export default ForgotPasswordScreen
