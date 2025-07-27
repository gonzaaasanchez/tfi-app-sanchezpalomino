import { UserModel } from './UserModel'

type CommentModel = {
  id: string
  comment: string
  author: UserModel
  createdAt: string
  updatedAt: string
}

export type { CommentModel } 