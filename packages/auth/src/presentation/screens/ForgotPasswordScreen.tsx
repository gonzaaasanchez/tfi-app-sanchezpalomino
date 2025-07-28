import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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
  ShowToast,
  useBottomSheetModalRef,
  useI18n,
} from '@app/common'
import catSuccess from '@app/assets/lottie-json/success-cat.json'
import { AnimationObject } from 'lottie-react-native'

type Props = NativeStackScreenProps<ParamList, 'forgotPasswordScreen'>

const ForgotPasswordScreen = ({ route }: Props): JSX.Element => {
  const {
    state,
    forgotPassword,
    resetPassword,
    setEmail,
    setCode,
    setNewPassword,
    setConfirmPassword,
    goToCodeStep,
    goToPasswordStep,
    goBackToEmailStep,
  } = useForgotPasswordViewModel()
  const { email } = route.params
  const { t } = useI18n()
  const bottomSheetModalRef = useBottomSheetModalRef()
  const [alertTitle, setAlertTitle] = useState('')
  const [alertSubtitle, setAlertSubtitle] = useState('')
  const [alertAnimation, setAlertAnimation] = useState(null)

  useLayoutEffect(() => {
    setEmail(email)
  }, [])

  const showAlert = (
    title: string,
    subtitle: string,
    animation?: AnimationObject | null
  ) => {
    setAlertTitle(title)
    setAlertSubtitle(subtitle)
    setAlertAnimation(animation)
    bottomSheetModalRef.current?.present()
  }

  useEffect(() => {
    if (state.error) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t(state.error),
      })
    }
  }, [state.error])

  const handleSendCode: () => Promise<void> = async () => {
    if (await forgotPassword()) {
      ShowToast({
        config: 'success',
        title: t('forgotPasswordScreen.codeSent.title'),
        subtitle: t('forgotPasswordScreen.codeSent.message', {
          email: state.email,
        }),
      })
    }
  }

  const handleVerifyCode: () => void = () => {
    if (state.code.length >= 4) {
      goToPasswordStep()
    }
  }

  const handleResetPassword: () => Promise<void> = async () => {
    if (await resetPassword()) {
      showAlert(
        t('forgotPasswordScreen.success.title'),
        t('forgotPasswordScreen.success.message'),
        catSuccess
      )
    }
  }

  const renderEmailStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>{t('forgotPasswordScreen.instructions')}</Text>

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
        title={t('forgotPasswordScreen.sendCode')}
        onPress={handleSendCode}
      />
    </View>
  )

  const renderCodeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>
        {t('forgotPasswordScreen.codeInstructions')}
      </Text>

      <Text style={styles.subtitle}>
        {t('forgotPasswordScreen.codeSentTo', { email: state.email })}
      </Text>

      <TextInput
        style={[styles.input, styles.codeInput]}
        placeholder={t('forgotPasswordScreen.code')}
        placeholderTextColor={Color.black[400]}
        keyboardType="number-pad"
        value={state.code}
        onChangeText={setCode}
        maxLength={6}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.buttonContainer}>
        <Button.Primary
          title={t('forgotPasswordScreen.verifyCode')}
          onPress={handleVerifyCode}
        />
        <Button.Secondary
          title={t('forgotPasswordScreen.back')}
          onPress={goBackToEmailStep}
        />
      </View>
    </View>
  )

  const renderPasswordStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>
        {t('forgotPasswordScreen.newPasswordInstructions')}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={t('forgotPasswordScreen.newPassword')}
        placeholderTextColor={Color.black[400]}
        secureTextEntry
        value={state.newPassword}
        onChangeText={setNewPassword}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
      />

      <TextInput
        style={styles.input}
        placeholder={t('forgotPasswordScreen.confirmPassword')}
        placeholderTextColor={Color.black[400]}
        secureTextEntry
        value={state.confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
      />

      <View style={styles.buttonContainer}>
        <Button.Primary
          title={t('forgotPasswordScreen.resetPassword')}
          onPress={handleResetPassword}
        />
        <Button.Secondary
          title={t('forgotPasswordScreen.back')}
          onPress={goToCodeStep}
        />
      </View>
    </View>
  )

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'email':
        return renderEmailStep()
      case 'code':
        return renderCodeStep()
      case 'password':
        return renderPasswordStep()
      default:
        return renderEmailStep()
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
            {renderCurrentStep()}
          </View>
        </KeyboardAvoidingView>
      </View>
      <PPBottomSheet.Dialog
        ref={bottomSheetModalRef}
        title={alertTitle}
        subtitle={alertSubtitle}
        lottieFile={alertAnimation}
      />
    </PPBottomSheetContainer>
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
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...LabelStyle.body2({ textAlign: 'center' }),
    paddingBottom: 16,
  },
  subtitle: {
    ...LabelStyle.caption1({ textAlign: 'center' }),
    paddingBottom: 30,
    color: Color.black[600],
  },
  input: {
    height: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Color.brand2[50],
    fontFamily: 'SourGummy-Regular',
  },
  codeInput: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 5,
  },
})

export default ForgotPasswordScreen
