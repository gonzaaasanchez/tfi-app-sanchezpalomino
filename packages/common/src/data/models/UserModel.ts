class UserModel {
  id?: string
  firstname?: string
  lastname?: string
  phoneNumber?: string
  email?: string
  avatar?: string

  constructor(data: Partial<UserModel>) {
    this.id = data.id
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.phoneNumber = data.phoneNumber
    this.email = data.email
    this.avatar = data.avatar
  }

  get fullName(): string {
    return `${this.firstname || ''} ${this.lastname || ''}`.trim()
  }
}

export { UserModel }
