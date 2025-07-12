import { HttpClient } from '@packages/common'
import { PaymentIntentModel } from '../../models/PaymentIntentModel'

export interface PaymentApi {
  createPaymentIntent(
    amount: number,
    currency: string,
    reservationId: string
  ): Promise<PaymentIntentModel>
}

export class PaymentApiImpl implements PaymentApi {
  constructor(private readonly httpClient: HttpClient) {}

  async createPaymentIntent(
    amount: number,
    currency: string,
    reservationId: string
  ): Promise<PaymentIntentModel> {
    const requestBody = {
      amount,
      currency,
      reservationId,
    }

    const response = await this.httpClient.post<PaymentIntentModel>(
      '/payments/create-payment-intent',
      requestBody
    )

    return response.data
  }
}
