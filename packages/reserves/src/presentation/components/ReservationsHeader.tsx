import { Color, LabelStyle, useI18n } from '@packages/common'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ReserveType, ReserveStatus } from '../../data/models/ReservationModel'

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
    { key: ReserveType.Owner, label: t('reservesScreen.types.sent') },
    { key: ReserveType.Caregiver, label: t('reservesScreen.types.received') },
  ]

  const availableStatuses: Option<ReserveStatus>[] = [
    {
      key: ReserveStatus.Confirmed,
      label: t('reservesScreen.statuses.accepted'),
    },
    { key: ReserveStatus.Pending, label: t('reservesScreen.statuses.pending') },
    {
      key: ReserveStatus.Started,
      label: t('En curso'),
    },
  ]

  const unavailableStatuses: Option<ReserveStatus>[] = [
    {
      key: ReserveStatus.CancelledCarer && ReserveStatus.CancelledOwner,
      label: t('Canceladas'),
    },
    {
      key: ReserveStatus.Rejected,
      label: t('reservesScreen.statuses.rejected'),
    },
    {
      key: ReserveStatus.Finished,
      label: t('Finalizadas'),
    },
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

  const TypesSegmentedControl = () => {
    return (
      <View style={[styles.segmentedControl, styles.typesSegmentedControl]}>
        {types.map((type) => (
          <TouchableOpacity
            key={type.key}
            style={[
              styles.typeButtonContainer,
              selectedType === type.key && styles.selectedButton,
            ]}
            onPress={() => setSelectedType(type.key)}
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
    )
  }

  const StatusesSegmentedControl = ({
    statuses,
    additionalStyle,
  }: {
    statuses: Option<ReserveStatus>[]
    additionalStyle?: any
  }) => {
    return (
      <View style={[styles.segmentedControl, additionalStyle]}>
        {statuses.map((status) => (
          <TouchableOpacity
            key={status.key}
            style={[
              styles.statusButtonContainer,
              selectedStatus === status.key && styles.selectedButton,
            ]}
            onPress={() => setSelectedStatus(status.key)}
          >
            <Text
              style={LabelStyle.callout2({
                color:
                  selectedStatus === status.key ? 'white' : Color.black[500],
              })}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TypesSegmentedControl />
      <View style={styles.separator} />
      <StatusesSegmentedControl
        statuses={availableStatuses}
        additionalStyle={styles.statusesAvailableSegmentedControl}
      />
      <StatusesSegmentedControl
        statuses={unavailableStatuses}
        additionalStyle={styles.statusesUnavailableSegmentedControl}
      />
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
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 24,
    backgroundColor: Color.mainBackground,
    overflow: 'hidden',
  },
  typesSegmentedControl: {
    marginBottom: 0,
  },
  statusesAvailableSegmentedControl: {
    marginBottom: 5,
  },
  statusesUnavailableSegmentedControl: {
    marginBottom: 0,
  },
  typeButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  selectedButton: {
    backgroundColor: Color.brand1[700],
    borderRadius: 24,
  },
  separator: {
    height: 1,
    backgroundColor: Color.brand2[100],
    marginVertical: 12,
    marginHorizontal: 12,
  },
})

export default ReservationsHeader
