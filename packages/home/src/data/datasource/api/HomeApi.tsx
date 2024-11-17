import { TestModel } from '../../models/TestModel'

interface HomeApi {
  test(): Promise<TestModel>
}

class HomeApiImpl implements HomeApi {
  test(): Promise<TestModel> {
    return Promise.resolve({ test: 'HomeTest' })
  }
}

export { HomeApi, HomeApiImpl }
