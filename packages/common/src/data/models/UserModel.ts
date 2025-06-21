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
}

export { UserModel }
