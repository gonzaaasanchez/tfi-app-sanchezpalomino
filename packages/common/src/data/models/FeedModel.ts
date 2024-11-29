type FeedModel = {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
  likes: number
  comments: number
  userLiked: boolean
  user: {
    firstname: string
    lastname: string
  }
}

export { FeedModel }
