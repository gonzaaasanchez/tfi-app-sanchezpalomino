import { TestModel } from '../../data/models/TestModel'

interface HomeRepository {
  test(): Promise<TestModel>
}

export default HomeRepository
