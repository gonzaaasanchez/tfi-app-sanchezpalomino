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
  Image,
} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ParamList } from '../AuthStack'
import { useLoginViewModel } from '../viewModels/LoginViewModel'
import { Button, Color, LabelStyle, useI18n } from '@app/common'

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
      Alert.alert(t('loginScreen.error.title'), t('loginScreen.error.emailMessage'))
      return
    } else if (state.error === 'login-invalid-password') {
      Alert.alert(t('loginScreen.error.title'), t('loginScreen.error.passwordMessage'))
      return
    } else if (state.error === 'login-missing-fields') {
      Alert.alert(t('loginScreen.error.title'), t('loginScreen.error.generalMessage'))
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

        <Button.Primary title={t('loginScreen.login')} onPress={handleLogin} />

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
            <Text style={{ ...LabelStyle.link, ...styles.linkText }}>
              {t('loginScreen.register')}
            </Text>
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
            <Text style={{ ...LabelStyle.link, ...styles.linkText }}>
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
    backgroundColor: Color.background,
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
    borderColor: Color.brand1[100],
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    marginVertical: 8,
  },
})

export default LoginScreen
