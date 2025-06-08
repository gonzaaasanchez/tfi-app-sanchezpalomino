import { UserModel } from '@packages/common'

interface SearchResultModel {
  user: UserModel
  rate: number
  reviews: number
}

export { SearchResultModel } 