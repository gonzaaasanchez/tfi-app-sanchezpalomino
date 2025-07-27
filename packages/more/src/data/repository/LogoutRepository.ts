import LogoutRepository from '../../domain/repository/LogoutRepository'
import { LogoutApi } from '../datasource/api/LogoutApi'

class LogoutRepositoryImpl implements LogoutRepository {
  private readonly api: LogoutApi

  constructor(api: LogoutApi) {
    this.api = api
  }

  async logout(): Promise<void> {
    return this.api.logout()
  }
}

export { LogoutRepositoryImpl } 