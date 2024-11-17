import { UIState } from '@app/common'
import { TestModel } from '../../data/models/TestModel'
import { useState } from 'react'

type HomeViewModel = {
  state: HomeState
}
type HomeState = {
  data: TestModel
} & UIState

const initialState: HomeState = {
  loading: false,
  error: null,
  data: { test: '' },
}

const useHomeViewModel = (): HomeViewModel => {
  const [state] = useState<HomeState>(initialState)

  return { state: { ...state } }
}

export { useHomeViewModel }
