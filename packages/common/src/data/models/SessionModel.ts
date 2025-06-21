import { UserModel } from './UserModel'

class SessionModel {
  token?: string
  user?: UserModel

  constructor(data: Partial<SessionModel>) {
    this.token = data.token
    this.user = data.user
  }
}

export { SessionModel }
