import React, { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FC } from 'react'
import { useI18n } from '../domain/hooks/i18n'
import { DetailItem } from './DetailItem'
import { LabelStyle } from '../style/Styles'
import { Color } from '../style/Color'
import { AddressModel } from '../data/models/AddressModel'

type AddressDetailheetProps = {
  address: AddressModel
  handlers?: {
    onEdit: () => void
    onDelete: () => void
  }
}

const AddressDetail: FC<AddressDetailheetProps> = ({ address, handlers }) => {
  const { t } = useI18n()

  return (
    <View style={{ paddingBottom: 20 }}>
      <Text style={styles.addressName}>{address?.name}</Text>
      <Text style={styles.addressType}>{`(${address?.fullAddress})`}</Text>
      {(address?.floor || address?.apartment) && (
        <>
          <Text style={styles.addressCharacteristicsTitle}>
            {t('addressDetailScreen.details')}
          </Text>
          {address?.floor && (
            <DetailItem
              icon="home-filled"
              iconSize={14}
              iconTopPadding={2}
              title={`${t('addressDetailScreen.floor')}`}
              value={`${address?.floor}`}
            />
          )}
          {address?.apartment && (
            <DetailItem
              icon="home-filled"
              iconSize={14}
              iconTopPadding={2}
              title={`${t('addressDetailScreen.apartment')}`}
              value={`${address?.apartment}`}
            />
          )}
        </>
      )}

      {handlers && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handlers.onEdit}>
            <Text style={styles.editButton}>
              {t('addressDetailScreen.edit')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlers.onDelete}>
            <Text style={styles.deleteButton}>
              {t('addressDetailScreen.delete')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  addressName: {
    ...LabelStyle.title1(),
    textAlign: 'center',
  },
  addressType: {
    ...LabelStyle.callout2(),
    textAlign: 'center',
    color: Color.black[500],
  },
  addressCharacteristicsTitle: {
    ...LabelStyle.body({ textAlign: 'center' }),
    paddingBottom: 10,
    paddingTop: 20,
    color: Color.black[800],
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingTop: 20,
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: Color.black[200],
  },
  editButton: {
    ...LabelStyle.body({ color: Color.black[500] }),
    borderBottomWidth: 1,
    borderBottomColor: Color.black[500],
  },
  deleteButton: {
    ...LabelStyle.body({ color: Color.red[700] }),
    borderBottomWidth: 1,
    borderBottomColor: Color.red[700],
  },
})

export { AddressDetail }
