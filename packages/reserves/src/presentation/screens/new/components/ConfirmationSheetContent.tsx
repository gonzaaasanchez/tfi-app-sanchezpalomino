import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Color, LabelStyle, useI18n, Button } from '@packages/common'
import { SearchResultModel } from '../../../../data/models/SearchResultModel'
import { SearchCriteria } from '../../../../data/models/SearchCriteria'
import { PlaceType } from '../../../../data/models/ReservationModel'

type ConfirmationSheetContentProps = {
  userToRequest: SearchResultModel
  searchCriteria: SearchCriteria
  onConfirm: () => void
  onBack: () => void
}

export const ConfirmationSheetContent = ({
  userToRequest,
  searchCriteria,
  onConfirm,
  onBack,
}: ConfirmationSheetContentProps) => {
  const { t } = useI18n()

  if (!userToRequest) return null

  const { caregiver, totalPrice, commission, totalWithCommission } =
    userToRequest

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

  const PaymentInfoRow = ({
    label,
    amount,
    isTotal,
  }: {
    label: string
    amount: number
    isTotal?: boolean
  }) => (
    <View style={[styles.paymentRow, isTotal && styles.totalRow]}>
      <Text
        style={
          isTotal
            ? LabelStyle.title3({ color: Color.black[700] })
            : LabelStyle.body({ color: Color.black[700], fontSize: 15 })
        }
      >
        {label}
      </Text>
      <Text
        style={
          isTotal
            ? LabelStyle.title3({ color: Color.black[700] })
            : LabelStyle.body({ color: Color.black[700], fontSize: 15 })
        }
      >
        ${amount}
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
        ).toLocaleDateString()}`}
      />
      <ConfirmationInfoRow
        title={t('reserveResultsScreen.confirmation.carer')}
        content={caregiver.fullName}
      />
      <ConfirmationInfoRow
        title={t('reserveResultsScreen.confirmation.location')}
        content={
          searchCriteria.placeType === PlaceType.OwnerHome
            ? t('reserveResultsScreen.confirmation.ownerHome')
            : t('reserveResultsScreen.confirmation.carerHome')
        }
      />

      <View style={styles.paymentSection}>
        <Text style={styles.paymentTitle}>
          {t('reserveResultsScreen.confirmation.payment')}
        </Text>
        <PaymentInfoRow
          label={t('reserveResultsScreen.confirmation.caregiverFee')}
          amount={totalPrice}
        />
        <PaymentInfoRow
          label={t('reserveResultsScreen.confirmation.commission')}
          amount={commission}
        />
        <PaymentInfoRow
          label={t('reserveResultsScreen.confirmation.total')}
          amount={totalWithCommission}
          isTotal
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button.Primary
          title={t('reserveResultsScreen.confirmation.confirm')}
          onPress={onConfirm}
        />
        <Button.Secondary
          title={t('reserveResultsScreen.confirmation.back')}
          onPress={onBack}
        />
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
  paymentSection: {
    marginTop: 8,
    marginBottom: 10,
    padding: 16,
    backgroundColor: Color.brand1[50],
    borderRadius: 8,
  },
  paymentTitle: {
    ...LabelStyle.title3({ color: Color.black[700] }),
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Color.black[200],
  },
  buttonContainer: {
    marginTop: 5,
  },
})
