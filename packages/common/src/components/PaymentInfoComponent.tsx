import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Color } from '../style/Color'
import { GeneralStyle, LabelStyle } from '../style/Styles'
import { useI18n } from '../domain/hooks/i18n'

type PaymentInfoRowProps = {
  isUserRequest?: boolean
  totalPrice: string
  commission: string
  totalOwner?: string
  totalCaregiver?: string
  needsShadow?: boolean
}

export const PaymentInfoComponent = ({
  isUserRequest = true,
  totalPrice,
  commission,
  totalOwner,
  totalCaregiver,
  needsShadow = false,
}: PaymentInfoRowProps) => {
  const { t } = useI18n()

  const PaymentInfoRowComponent = ({
    label,
    amount,
    isTotal,
  }: {
    label: string
    amount: string
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
    <View
      style={{
        ...(needsShadow && GeneralStyle.card),
        ...styles.paymentSection,
      }}
    >
      <Text style={styles.paymentTitle}>
        {isUserRequest
          ? t('paymentInfo.userPayment.title')
          : t('paymentInfo.caregiverPayment.title')}
      </Text>
      <PaymentInfoRowComponent
        label={
          isUserRequest
            ? t('paymentInfo.userPayment.caregiverFee')
            : t('paymentInfo.caregiverPayment.fees')
        }
        amount={totalPrice}
      />
      <PaymentInfoRowComponent
        label={
          isUserRequest
            ? t('paymentInfo.userPayment.commission')
            : t('paymentInfo.caregiverPayment.commission')
        }
        amount={commission}
      />
      {totalOwner && (
        <PaymentInfoRowComponent
          label={t('paymentInfo.userPayment.total')}
          amount={totalOwner}
          isTotal
        />
      )}
      {totalCaregiver && (
        <PaymentInfoRowComponent
          label={t('paymentInfo.caregiverPayment.total')}
          amount={totalCaregiver}
          isTotal
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  paymentSection: {
    marginTop: 8,
    marginBottom: 10,
    padding: 16,
    backgroundColor: Color.brand1[50],
    borderRadius: 8,
  },
  paymentTitle: {
    ...LabelStyle.body({ color: Color.black[800] }),
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Color.black[200],
  },
})
