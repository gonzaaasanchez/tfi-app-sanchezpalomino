class UserModel {
  id?: string
  token?: string
  firstname?: string
  lastname?: string
  avatar?: string

  constructor(data: Partial<UserModel>) {
    this.id = data.id
    this.token = data.token
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.avatar = data.avatar
  }

  get fullName(): string {
    return `${this.firstname || ''} ${this.lastname || ''}`.trim()
  }
}

export { UserModel }
