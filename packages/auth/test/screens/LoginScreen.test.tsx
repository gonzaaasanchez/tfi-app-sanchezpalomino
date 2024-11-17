import React from 'react'
import { render } from '@testing-library/react-native'
import LoginScreen from '../../src/presentation/screens/LoginScreen'
import { useLoginViewModel } from '../../src/presentation/viewModels/LoginViewModel'
import { NavigationContainer } from '@react-navigation/native'

jest.mock('../../src/presentation/viewModels/LoginViewModel', () => ({
  useLoginViewModel: jest.fn(),
}))

describe('LoginScreen', () => {
  it('should match snapshot when loading', () => {
    ;(useLoginViewModel as jest.Mock).mockReturnValue({
      state: { loading: true, email: '', password: '', error: null },
      login: jest.fn(),
      setEmail: jest.fn(),
      setPassword: jest.fn(),
    })

    const { toJSON } = render(
      <NavigationContainer>
        <LoginScreen navigation={undefined} route={undefined} />
      </NavigationContainer>
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('should match snapshot with default state', () => {
    ;(useLoginViewModel as jest.Mock).mockReturnValue({
      state: { loading: false, email: '', password: '', error: null },
      login: jest.fn(),
      setEmail: jest.fn(),
      setPassword: jest.fn(),
    })

    const { toJSON } = render(
      <NavigationContainer>
        <LoginScreen navigation={undefined} route={undefined} />
      </NavigationContainer>
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
