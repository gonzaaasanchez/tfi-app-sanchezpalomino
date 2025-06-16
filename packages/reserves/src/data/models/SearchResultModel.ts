import { UserModel } from '@packages/common'

interface SearchResultModel {
  user: UserModel
  distance: number
  rate: {
    value: number
    count: number
  }
  price: {
    fee: number
    charge: number
    total: number
  }
}

export { SearchResultModel } 