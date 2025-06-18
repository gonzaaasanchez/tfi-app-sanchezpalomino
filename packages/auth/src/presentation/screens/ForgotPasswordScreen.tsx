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
  ShowToast,
  useBottomSheetModalRef,
  useI18n,
} from '@app/common'
import catSuccess from '@app/assets/lottie-json/success-cat.json'
import { AnimationObject } from 'lottie-react-native'

type Props = NativeStackScreenProps<ParamList, 'forgotPasswordScreen'>

const ForgotPasswordScreen = ({ route }: Props): JSX.Element => {
  const { state, forgotPassword, setEmail } = useForgotPasswordViewModel()
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
    if (state.error === 'forgot-password-missing-fields') {
      showAlert(t('general.ups'), t('forgotPasswordScreen.error.message'))
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

  const handlePasswordReset: () => Promise<void> = async () => {
    if (await forgotPassword()) {
      showAlert(
        t('forgotPasswordScreen.success.title'),
        t('forgotPasswordScreen.success.message', { email: state.email }),
        catSuccess
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
            <Text style={styles.title}>
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
  title: {
    ...LabelStyle.body2({ textAlign: 'center' }),
    paddingBottom: 30,
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

export default ForgotPasswordScreen
