import LogoutRepository from '../repository/LogoutRepository'

class LogoutUseCase {
  private logoutRepository: LogoutRepository

  constructor(logoutRepository: LogoutRepository) {
    this.logoutRepository = logoutRepository
  }

  async execute(): Promise<void> {
    return await this.logoutRepository.logout()
  }
}

export { LogoutUseCase } 