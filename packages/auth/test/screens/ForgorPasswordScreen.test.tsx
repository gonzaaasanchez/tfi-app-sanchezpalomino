import React from 'react'
import { render } from '@testing-library/react-native'
import ForgotPasswordScreen from '../../src/presentation/screens/ForgotPasswordScreen'
import { useForgotPasswordViewModel } from '../../src/presentation/viewModels/ForgotPasswordViewModel'
import { NavigationContainer } from '@react-navigation/native'

jest.mock('../../src/presentation/viewModels/ForgotPasswordViewModel', () => ({
  useForgotPasswordViewModel: jest.fn(),
}))

describe('ForgotPasswordScreen', () => {
  it('should match snapshot when loading', () => {
    ;(useForgotPasswordViewModel as jest.Mock).mockReturnValue({
      state: { loading: true, email: '', error: null },
      forgotPassword: jest.fn(),
      setEmail: jest.fn(),
    })

    const { toJSON } = render(
      <NavigationContainer>
        <ForgotPasswordScreen
          navigation={undefined}
          route={{
            key: 'forgotPasswordScreen',
            name: 'forgotPasswordScreen',
            params: { email: '' },
          }}
        />
      </NavigationContainer>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('should match snapshot with default state', () => {
    ;(useForgotPasswordViewModel as jest.Mock).mockReturnValue({
      state: { loading: false, email: '', error: null },
      forgotPassword: jest.fn(),
      setEmail: jest.fn(),
    })

    const { toJSON } = render(
      <NavigationContainer>
        <ForgotPasswordScreen
          navigation={undefined}
          route={{
            key: 'forgotPasswordScreen',
            name: 'forgotPasswordScreen',
            params: { email: '' },
          }}
        />
      </NavigationContainer>
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
