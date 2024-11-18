import React, { useEffect, useLayoutEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { ParamList } from '../AuthStack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useForgotPasswordViewModel } from '../viewModels/ForgotPasswordViewModel'
import { Button, Color, LabelStyle, Loader, useI18n } from '@app/common'

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

  const handlePasswordReset: () => Promise<void> = async () => {
    if (await forgotPassword()) {
      Alert.alert(
        t('forgotPasswordScreen.success.title'),
        t('forgotPasswordScreen.success.message', { email: state.email })
      )
    }
  }

  return (
    <View style={styles.fullScreenContainer}>
      {state.loading && <Loader loading={state.loading}/>}
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
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
    paddingBottom: 30,
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

export default ForgotPasswordScreen
