import { PaymentIntentModel } from '../../data/models/PaymentIntentModel'

interface PaymentRepository {
  createPaymentIntent(
    amount: number,
    currency: string,
    reservationId: string
  ): Promise<PaymentIntentModel>
}

export default PaymentRepository
