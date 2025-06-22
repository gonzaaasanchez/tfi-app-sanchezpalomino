export interface CarerConfig {
  homeCare: {
    enabled: boolean
    dayPrice: number | null
  }
  petHomeCare: {
    enabled: boolean
    visitPrice: number | null
  }
}

class UserModel {
  _id?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  email?: string
  avatar?: string
  carerConfig?: CarerConfig

  constructor(data: Partial<UserModel>) {
    this._id = data._id || null
    this.firstName = data.firstName || null
    this.lastName = data.lastName || null
    this.phoneNumber = data.phoneNumber || null
    this.email = data.email || null
    this.avatar = data.avatar || null
    this.carerConfig = data.carerConfig || null
  }

  get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim()
  }

  toPlainObject() {
    return Object.assign({}, this)
  }
}

export { UserModel }
