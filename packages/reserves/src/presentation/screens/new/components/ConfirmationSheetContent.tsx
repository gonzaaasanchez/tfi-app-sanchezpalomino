import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {
  Color,
  LabelStyle,
  useI18n,
  Button,
  PaymentInfoComponent,
  ShowToast,
} from '@packages/common'
import { SearchResultModel } from '../../../../data/models/SearchResultModel'
import { SearchCriteria } from '../../../../data/models/SearchCriteria'
import { PlaceType } from '../../../../data/models/ReservationModel'
import { useStripePayment } from '../../../hooks/useStripePayment'

type ConfirmationSheetContentProps = {
  resultItem: SearchResultModel
  searchCriteria: SearchCriteria
  onConfirm: () => void
  onBack: () => void
}

export const ConfirmationSheetContent = ({
  resultItem,
  searchCriteria,
  onConfirm,
  onBack,
}: ConfirmationSheetContentProps) => {
  const { t } = useI18n()

  if (!resultItem) return null

  const { caregiver, totalPrice, commission, totalOwner } = resultItem

  // Stripe payment hook
  const {
    loading: paymentLoading,
    initializeStripe,
    processPayment,
  } = useStripePayment({
    onPaymentSuccess: () => {
      ShowToast({
        config: 'success',
        title: t('payment.success.title'),
        subtitle: t('payment.success.message'),
      })
      onConfirm()
    },
    onPaymentError: (error) => {
      ShowToast({
        config: 'error',
        title: t('payment.error.title'),
        subtitle: error,
      })
    },
  })

  // Initialize Stripe when component mounts
  useEffect(() => {
    initializeStripe()
  }, [initializeStripe])

  const handleConfirmWithPayment = async () => {
    try {
      // 1. Primero crear la reserva
      onConfirm()
      
      // 2. Procesar el pago (el backend maneja el reservationId)
      await processPayment({
        amount: totalOwner * 100,
        currency: 'ars',
      })
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  const ConfirmationInfoRow = ({
    title,
    content,
  }: {
    title: string
    content: string
  }) => (
    <View style={styles.confirmationSection}>
      <Text
        style={LabelStyle.body2({ fontWeight: 500, color: Color.black[700] })}
      >
        {title}
      </Text>
      <Text style={LabelStyle.callout2({ color: Color.black[500] })}>
        {content}
      </Text>
    </View>
  )

  return (
    <View>
      <Text style={styles.confirmationTitle}>
        {t('reserveResultsScreen.confirmation.title')}
      </Text>
      <ConfirmationInfoRow
        title={t('reserveResultsScreen.confirmation.pets')}
        content={searchCriteria.selectedPets.map((pet) => pet.name).join(', ')}
      />
      <ConfirmationInfoRow
        title={t('reserveResultsScreen.confirmation.dates')}
        content={`${new Date(searchCriteria.fromDate).toLocaleDateString()} - ${new Date(
          searchCriteria.toDate
        ).toLocaleDateString()} (${resultItem.daysCount} días)`}
      />
      <ConfirmationInfoRow
        title={t('reserveResultsScreen.confirmation.carer')}
        content={caregiver.fullName}
      />
      {searchCriteria.placeType === PlaceType.OwnerHome && (
        <ConfirmationInfoRow
          title={t('reserveResultsScreen.confirmation.location')}
          content={`${t('reserveResultsScreen.confirmation.ownerHome')} (${searchCriteria.selectedAddress?.fullAddress})`}
        />
      )}
      {searchCriteria.placeType === PlaceType.CarerHome && (
        <ConfirmationInfoRow
          title={t('reserveResultsScreen.confirmation.location')}
          content={`${t('reserveResultsScreen.confirmation.carerHome')} (${caregiver.addresses[0]?.fullAddress})`}
        />
      )}

      <PaymentInfoComponent
        totalPrice={totalPrice.toString()}
        commission={commission.toString()}
        totalOwner={totalOwner.toString()}
      />

      <View style={styles.buttonContainer}>
        <Button.Primary
          title={
            paymentLoading
              ? t('payment.processing')
              : t('reserveResultsScreen.confirmation.confirm')
          }
          onPress={handleConfirmWithPayment}
          disabled={paymentLoading}
        />
        <TouchableOpacity onPress={onBack} disabled={paymentLoading}>
          <Text
            style={[styles.backButton, paymentLoading && styles.disabledText]}
          >
            {t('reserveResultsScreen.confirmation.back')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  confirmationTitle: {
    ...LabelStyle.title2({
      color: Color.black[700],
      textAlign: 'center',
    }),
    marginBottom: 15,
  },
  confirmationSection: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 5,
  },
  backButton: {
    ...LabelStyle.body({ color: Color.black[500], textAlign: 'center' }),
    marginTop: 20,
    marginBottom: 15,
  },
  disabledText: {
    opacity: 0.5,
  },
})
