import HomeRepository from '../../domain/repository/HomeRepository'
import { HomeApi } from '../datasource/api/HomeApi'
import { TestModel } from '../models/TestModel'

class HomeRepositoryImpl implements HomeRepository {
  private api: HomeApi

  constructor(api: HomeApi) {
    this.api = api
  }
  test(): Promise<TestModel> {
    return this.api.test()
  }
}

export { HomeRepositoryImpl }
