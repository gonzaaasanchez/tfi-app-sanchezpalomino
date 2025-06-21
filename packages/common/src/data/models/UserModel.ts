import { Resolver } from '../../domain/interfaces/Resolver'
import { $ } from '../../domain/di/Types'

class UserModel {
  id?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  email?: string
  avatar?: string

  constructor(data: Partial<UserModel>) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.phoneNumber = data.phoneNumber
    this.email = data.email
    this.avatar = data.avatar
  }

  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim()
  }

  getAvatarUrl(baseUrl: string): string {
    if (!this.avatar) {
      return ''
    }

    if (
      this.avatar.startsWith('http://') ||
      this.avatar.startsWith('https://')
    ) {
      return this.avatar
    }

    return `${baseUrl}${this.avatar.startsWith('/') ? '' : '/'}${this.avatar}`
  }
}

export { UserModel }
