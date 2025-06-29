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
}

export { AddressModel }
