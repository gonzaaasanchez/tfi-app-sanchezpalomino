import PaymentRepository from '../repository/PaymentRepository'
import { PaymentIntentModel } from '../../data/models/PaymentIntentModel'

class CreatePaymentIntentUseCase {
  private paymentRepository: PaymentRepository

  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  async execute(
    amount: number,
    currency: string,
    reservationId: string
  ): Promise<PaymentIntentModel> {
    return this.paymentRepository.createPaymentIntent(
      amount,
      currency,
      reservationId
    )
  }
}

export { CreatePaymentIntentUseCase }
