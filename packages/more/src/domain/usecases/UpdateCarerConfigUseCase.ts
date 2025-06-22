import { UserModel, CarerConfig } from '@app/common'
import { UserRepository } from '../repository/UserRepository'

export class UpdateCarerConfigUseCase {
  constructor(private repository: UserRepository) {}

  async execute(carerConfig: CarerConfig): Promise<UserModel> {
    return await this.repository.updateCarerConfig(carerConfig)
  }
}
