import { useState, useCallback } from 'react'
import { initStripe, usePaymentSheet } from '@stripe/stripe-react-native'
import { STRIPE_CONFIG, getUrlScheme } from '../../config/stripe'
import { useI18n, useInjection } from '@packages/common'
import { $ } from '../../domain/di/Types'
import { CreatePaymentIntentUseCase } from '../../domain/usecases/CreatePaymentIntentUseCase'

interface UseStripePaymentProps {
  onPaymentSuccess: () => void
  onPaymentError: (error: string) => void
}

interface PaymentData {
  amount: number
  currency: string
  reservationId: string
}

export const useStripePayment = ({
  onPaymentSuccess,
  onPaymentError,
}: UseStripePaymentProps) => {
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet()
  const createPaymentIntentUseCase: CreatePaymentIntentUseCase = useInjection(
    $.CreatePaymentIntentUseCase
  )

  const initializeStripe = useCallback(async () => {
    try {
      await initStripe({
        publishableKey: STRIPE_CONFIG.publishableKey,
        urlScheme: getUrlScheme(),
      })
    } catch (error) {
      console.error('Error initializing Stripe:', error)
      onPaymentError(t('payment.error.initialization'))
    }
  }, [onPaymentError, t])

  const processPayment = useCallback(
    async (paymentData: PaymentData) => {
      setLoading(true)

      try {
        const paymentIntent = await createPaymentIntentUseCase.execute(
          paymentData.amount,
          paymentData.currency,
          paymentData.reservationId
        )

        const { clientSecret } = paymentIntent

        if (!clientSecret) {
          throw new Error('No client secret received from backend')
        }

        const { error: initError } = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: STRIPE_CONFIG.merchantDisplayName,
        })

        if (initError) {
          throw new Error(initError.message)
        }

        const { error: presentError } = await presentPaymentSheet()

        if (presentError) {
          throw new Error(presentError.message)
        }

        // Payment successful - backend handles status via webhooks
        onPaymentSuccess()
      } catch (error) {
        if (error instanceof Error) {
          onPaymentError(error.message)
        } else {
          onPaymentError(t('payment.error.general'))
        }
      } finally {
        setLoading(false)
      }
    },
    [
      onPaymentSuccess,
      onPaymentError,
      initPaymentSheet,
      presentPaymentSheet,
      createPaymentIntentUseCase,
      t,
    ]
  )

  return {
    loading,
    initializeStripe,
    processPayment,
  }
}
