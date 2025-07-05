import { ReservationModel, UserModel } from './ReservationModel'

export class ReservationReviewModel {
  constructor(
    public reservation: ReservationModel,
    public reviews: {
      owner: ReviewModel | null
      caregiver: ReviewModel | null
    },
    public summary: {
      hasOwnerReview: boolean
      hasCarerReview: boolean
    }
  ) {}
}

export type ReviewModel = {
  id: string
  reviewer: UserModel
  reviewerUser: UserModel
  rating: number
  comment: string
  createdAt: string
}
