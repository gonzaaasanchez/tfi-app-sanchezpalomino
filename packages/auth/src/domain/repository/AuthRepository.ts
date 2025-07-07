import { SessionModel } from '@app/common'

interface AuthRepository {
  login(email: string, password: string): Promise<SessionModel>
  createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<SessionModel>
  forgotPassword(email: string): Promise<void>
}

export default AuthRepository
