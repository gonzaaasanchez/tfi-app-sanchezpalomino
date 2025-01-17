import { Color, LabelStyle, useI18n } from '@packages/common'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ReserveType, ReserveStatus } from '../../data/models/local/Types'

type Option<K extends string> = {
  key: K
  label: string
}

type ReservationsHeaderProps = {
  onTypeSelected: (ReserveType) => void
  onStatusSelected: (ReserveStatus) => void
  defaultSelectedType: ReserveType
  defaultSelectedStatus: ReserveStatus
}

const ReservationsHeader: React.FC<ReservationsHeaderProps> = ({
  onTypeSelected,
  onStatusSelected,
  defaultSelectedType,
  defaultSelectedStatus,
}) => {
  const { t } = useI18n()

  const types: Option<ReserveType>[] = [
    { key: 'sent', label: t('reservesScreen.types.sent') },
    { key: 'received', label: t('reservesScreen.types.received') },
  ]

  const statuses: Option<ReserveStatus>[] = [
    { key: 'confirmed', label: t('reservesScreen.statuses.accepted') },
    { key: 'pending', label: t('reservesScreen.statuses.pending') },
    { key: 'cancelled', label: t('reservesScreen.statuses.rejected') },
  ]

  const [selectedType, setSelectedType] =
    useState<ReserveType>(defaultSelectedType)
  const [selectedStatus, setSelectedStatus] = useState<ReserveStatus>(
    defaultSelectedStatus
  )

  useEffect(() => {
    onTypeSelected(selectedType)
  }, [selectedType])

  useEffect(() => {
    onStatusSelected(selectedStatus)
  }, [selectedStatus])

  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        {types.map((type) => (
          <TouchableOpacity
            key={type.key}
            style={[
              styles.buttonContainer,
              selectedType === type.key && styles.selectedButton,
            ]}
            onPress={() => {
              setSelectedType(type.key)
            }}
          >
            <Text
              style={LabelStyle.callout({
                color: selectedType === type.key ? 'white' : Color.black[500],
              })}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.segmentedControl}>
        {statuses.map((status) => (
          <TouchableOpacity
            key={status.key}
            style={[
              styles.buttonContainer,
              selectedStatus === status.key && styles.selectedButton,
            ]}
            onPress={() => {
              setSelectedStatus(status.key)
            }}
          >
            <Text
              style={LabelStyle.callout({
                color:
                  selectedStatus === status.key ? 'white' : Color.black[500],
              })}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Color.brand2[50],
    borderBottomColor: Color.brand2[200],
    borderBottomWidth: 1,
    gap: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 24,
    backgroundColor: Color.mainBackground,
    overflow: 'hidden',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectedButton: {
    backgroundColor: Color.brand1[700],
    borderRadius: 24,
  },
})

export default ReservationsHeader
