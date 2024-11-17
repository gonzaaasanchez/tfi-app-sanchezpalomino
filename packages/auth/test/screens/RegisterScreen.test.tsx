import React from 'react'
import { render } from '@testing-library/react-native'
import RegisterScreen from '../../src/presentation/screens/RegisterScreen'
import { useRegisterViewModel } from '../../src/presentation/viewModels/RegisterViewModel'
import { NavigationContainer } from '@react-navigation/native'

jest.mock('../../src/presentation/viewModels/RegisterViewModel', () => ({
  useRegisterViewModel: jest.fn(),
}))

describe('RegisterScreen', () => {
  it('should match snapshot when loading', () => {
    ;(useRegisterViewModel as jest.Mock).mockReturnValue({
      state: {
        loading: true,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
      },
      createUser: jest.fn(),
      setEmail: jest.fn(),
      setPassword: jest.fn(),
      setConfirmPassword: jest.fn(),
      setName: jest.fn(),
    })

    const { toJSON } = render(
      <NavigationContainer>
        <RegisterScreen
          navigation={undefined}
          route={{
            key: 'registerScreen',
            name: 'registerScreen',
            params: { email: '' },
          }}
        />
      </NavigationContainer>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('should match snapshot with default state', () => {
    ;(useRegisterViewModel as jest.Mock).mockReturnValue({
      state: {
        loading: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
      },
      createUser: jest.fn(),
      setEmail: jest.fn(),
      setPassword: jest.fn(),
      setConfirmPassword: jest.fn(),
      setName: jest.fn(),
    })

    const { toJSON } = render(
      <NavigationContainer>
        <RegisterScreen
          navigation={undefined}
          route={{
            key: 'registerScreen',
            name: 'registerScreen',
            params: { email: '' },
          }}
        />
      </NavigationContainer>
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
