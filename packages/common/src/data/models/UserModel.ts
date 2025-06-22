import { getImageFullUrl } from '../../utils/ImageUtils'

class UserModel {
  _id?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  email?: string
  avatar?: string

  constructor(data: Partial<UserModel>) {
    this._id = data._id || null
    this.firstName = data.firstName || null
    this.lastName = data.lastName || null
    this.phoneNumber = data.phoneNumber || null
    this.email = data.email || null
    this.avatar = data.avatar || null
  }

  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim()
  }

  toPlainObject() {
    return Object.assign({}, this)
  }
}

export { UserModel }
