import PaymentRepository from '../../domain/repository/PaymentRepository'
import { PaymentIntentModel } from '../models/PaymentIntentModel'
import { PaymentApi } from '../datasource/api/PaymentApi'

class PaymentRepositoryImpl implements PaymentRepository {
  private readonly api: PaymentApi

  constructor(api: PaymentApi) {
    this.api = api
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    reservationId: string
  ): Promise<PaymentIntentModel> {
    return this.api.createPaymentIntent(amount, currency, reservationId)
  }
}

export default PaymentRepositoryImpl 