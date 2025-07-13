import { UserModel } from './UserModel'

type FeedModel = {
  id: string
  title: string
  description: string
  image: string
  commentsCount: number
  likesCount: number
  hasLiked: boolean
  author: UserModel
  createdAt: string
  updatedAt: string
}

export { FeedModel }
