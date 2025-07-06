import { Color, LabelStyle, SelectableOption, useI18n } from '@packages/common'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ReserveStatus, ReserveType } from '../../data/models/ReservationModel'
import { ReserveLabelFromStatus } from '../../data/models/ReservationModel'

type ReservationsHeaderProps = {
  types: SelectableOption<ReserveType>[]
  onTypeSelected: (ReserveType) => void
  defaultSelectedType: ReserveType
  currentStatus: ReserveStatus
}

const ReservationsHeader: React.FC<ReservationsHeaderProps> = ({
  types,
  onTypeSelected,
  defaultSelectedType,
  currentStatus,
}) => {
  const { t } = useI18n()

  const [selectedType, setSelectedType] =
    useState<ReserveType>(defaultSelectedType)

  useEffect(() => {
    onTypeSelected(selectedType)
  }, [selectedType])

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
              {t(type.label)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TypesSegmentedControl />
      <View style={styles.statusContainer}>
        <Text
          style={LabelStyle.callout2({
            color: Color.brand1[600],
            textAlign: 'center',
          })}
        >
          {t('reservesScreen.currentStatus')}
        </Text>
        <Text
          style={LabelStyle.callout2({
            color: Color.brand1[800],
            fontWeight: 500,
            textAlign: 'center',
          })}
        >
          {t(ReserveLabelFromStatus(currentStatus))}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Color.brand2[50],
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
  typeButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectedButton: {
    backgroundColor: Color.brand1[700],
    borderRadius: 24,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
  },
})

export default ReservationsHeader
