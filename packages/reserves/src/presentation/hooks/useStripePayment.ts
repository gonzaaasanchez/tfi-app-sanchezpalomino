import { useState, useCallback } from 'react'
import { initStripe, usePaymentSheet } from '@stripe/stripe-react-native'
import { STRIPE_CONFIG, getUrlScheme } from '../../config/stripe'
import { useI18n } from '@packages/common'

interface UseStripePaymentProps {
  onPaymentSuccess: () => void
  onPaymentError: (error: string) => void
}

interface PaymentData {
  amount: number
  currency: string
}

export const useStripePayment = ({
  onPaymentSuccess,
  onPaymentError,
}: UseStripePaymentProps) => {
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet()

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
        const response = await fetch(
          `${STRIPE_CONFIG.backendUrl}/create-payment-intent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: paymentData.amount,
              currency: paymentData.currency,
            }),
          }
        )

        if (!response.ok) {
          throw new Error(t('payment.error.creatingIntent'))
        }

        const { clientSecret } = await response.json()

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

        // 4. Payment successful - backend handles status via webhooks
        onPaymentSuccess()
      } catch (error) {
        console.error('Payment error:', error)
        onPaymentError(
          error instanceof Error ? error.message : t('payment.error.general')
        )
      } finally {
        setLoading(false)
      }
    },
    [onPaymentSuccess, onPaymentError, initPaymentSheet, presentPaymentSheet, t]
  )

  return {
    loading,
    initializeStripe,
    processPayment,
  }
}
