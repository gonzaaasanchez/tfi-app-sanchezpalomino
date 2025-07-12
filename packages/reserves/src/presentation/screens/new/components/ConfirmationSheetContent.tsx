import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import {
  Color,
  LabelStyle,
  useI18n,
  Button,
  PaymentInfoComponent,
} from '@packages/common'
import { SearchResultModel } from '../../../../data/models/SearchResultModel'
import { SearchCriteria } from '../../../../data/models/SearchCriteria'
import { PlaceType } from '../../../../data/models/ReservationModel'

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
          title={t('reserveResultsScreen.confirmation.confirm')}
          onPress={onConfirm}
        />
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>
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
