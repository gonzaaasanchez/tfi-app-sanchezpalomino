import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import {
  Button,
  Color,
  LabelStyle,
  Loader,
  PPBottomSheet,
  PPBottomSheetContainer,
  useI18n,
} from '@app/common'

type Props = NativeStackScreenProps<ParamList, 'forgotPasswordScreen'>

const ForgotPasswordScreen = ({ route }: Props): JSX.Element => {
  const { state, forgotPassword, setEmail } = useForgotPasswordViewModel()
  const { email } = route.params
  const { t } = useI18n()
  const bottomSheetModalRef = useRef(null)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertSubtitle, setAlertSubtitle] = useState('')

  useLayoutEffect(() => {
    setEmail(email)
  }, [])

  const showAlert = (title: string, subtitle: string) => {
    setAlertTitle(title)
    setAlertSubtitle(subtitle)
    bottomSheetModalRef.current?.present()
  }

  useEffect(() => {
    if (state.error === 'forgot-password-missing-fields') {
      showAlert(
        t('forgotPasswordScreen.error.title'),
        t('forgotPasswordScreen.error.message')
      )
      return
    } else if (state.error !== null) {
      showAlert(t('forgotPasswordScreen.error.title'), state.error)
      return
    }
  }, [state.error])

  const handlePasswordReset: () => Promise<void> = async () => {
    if (await forgotPassword()) {
      showAlert(
        t('forgotPasswordScreen.success.title'),
        t('forgotPasswordScreen.success.message', { email: state.email })
      )
    }
  }

  return (
    <PPBottomSheetContainer>
      <View style={styles.fullScreenContainer}>
        {state.loading && <Loader loading={state.loading} />}
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
      <PPBottomSheet
        ref={bottomSheetModalRef}
        title={alertTitle}
        subtitle={alertSubtitle}
      />
    </PPBottomSheetContainer>
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
