import { UserModel } from '@app/common'

interface AuthRepository {
  login(email: string, password: string): Promise<UserModel>
  createUser(email: string, password: string, name: string): Promise<UserModel>
  forgotPassword(email: string): Promise<void>
}

export default AuthRepository
