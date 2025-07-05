import { Color, LabelStyle, SelectableOption, useI18n } from '@packages/common'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ReserveType } from '../../data/models/ReservationModel'

type ReservationsHeaderProps = {
  types: SelectableOption<ReserveType>[]
  onTypeSelected: (ReserveType) => void
  defaultSelectedType: ReserveType
}

const ReservationsHeader: React.FC<ReservationsHeaderProps> = ({
  types,
  onTypeSelected,
  defaultSelectedType,
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
})

export default ReservationsHeader
