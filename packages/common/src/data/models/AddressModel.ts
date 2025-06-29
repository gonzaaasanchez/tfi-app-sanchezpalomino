import { Options } from 'react-native/Libraries/Utilities/codegenNativeComponent'
class AddressModel {
  _id: string
  name: string
  fullAddress: string
  floor?: string
  apartment?: string
  coords: {
    lat: number
    lon: number
  }

  constructor(data: Partial<AddressModel> | any) {
    this._id = data._id
    this.name = data.name
    this.fullAddress = data.fullAddress
    this.floor = data.floor
    this.apartment = data.apartment
    this.coords = data.coords
  }

  secondaryAddress(t: (key: string, options?: Options) => string): string {
    const parts: string[] = []
    if (this.floor) {
      parts.push(`${t('address.floor')}: ${this.floor}`)
    }
    if (this.apartment) {
      parts.push(`${t('address.apartment')}: ${this.apartment}`)
    }
    return parts.join(' - ')
  }
}

export { AddressModel }
