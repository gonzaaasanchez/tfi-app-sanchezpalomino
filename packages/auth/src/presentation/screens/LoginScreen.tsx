import React, { FC, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ParamList } from '../AuthStack'
import { useLoginViewModel } from '../viewModels/LoginViewModel'
import {
  Button,
  Color,
  LabelStyle,
  Loader,
  PPBottomSheetContainer,
  ShowToast,
  useI18n,
} from '@app/common'

type Props = NativeStackScreenProps<ParamList, 'loginScreen'>

const LoginScreen: FC<Props> = () => {
  const { state, login, setEmail, setPassword } = useLoginViewModel()
  const navigation = useNavigation()
  const { t } = useI18n()

  const handleLogin: () => void = () => {
    login()
  }

  useEffect(() => {
    if (state.error === 'login-invalid-email') {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t('loginScreen.error.emailMessage'),
      })
      return
    } else if (state.error === 'login-invalid-password') {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t('loginScreen.error.passwordMessage'),
      })
      return
    } else if (state.error === 'login-missing-fields') {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: t('loginScreen.error.generalMessage'),
      })
      return
    } else if (state.error !== null) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: state.error,
      })
    }
  }, [state.error])

  return (
    <PPBottomSheetContainer>
      <View style={styles.fullScreenContainer}>
        {state.loading && <Loader loading={state.loading} />}
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.inner} accessible={false}>
            <Image
              source={require('@app/assets/logo-simple.png')}
              style={styles.image}
            />

            <TextInput
              style={styles.input}
              placeholder={t('loginScreen.email')}
              placeholderTextColor={Color.black[400]}
              keyboardType="email-address"
              value={state.email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />

            <TextInput
              style={styles.input}
              placeholder={t('loginScreen.password')}
              placeholderTextColor={Color.black[400]}
              secureTextEntry
              value={state.password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType={'oneTimeCode'}
            />

            <Button.Primary
              title={t('loginScreen.login')}
              onPress={handleLogin}
            />

            <View style={styles.linkContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(
                    StackActions.push('registerScreen', {
                      email: state.email,
                    })
                  )
                }
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
              >
                <Text style={styles.linkText}>
                  {t('loginScreen.forgotPassword')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
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
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 230,
    resizeMode: 'contain',
    marginBottom: 80,
  },
  input: {
    height: 48,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Color.brand2[50],
    fontFamily: 'SourGummy-Regular',
  },
  linkContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  linkText: {
    ...LabelStyle.link(),
    marginVertical: 8,
  },
})

export default LoginScreen
