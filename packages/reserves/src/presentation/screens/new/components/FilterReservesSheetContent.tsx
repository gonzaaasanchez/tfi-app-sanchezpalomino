import React from 'react'
import {
  Color,
  PPMaterialIcon,
  LabelStyle,
  useI18n,
  Button,
  SelectableOption,
} from '@packages/common'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { ReserveStatus } from '../../../../data/models/ReservationModel'

type FilterReservesSheetContentProps = {
  statusOptions: readonly SelectableOption<ReserveStatus>[]
  status: ReserveStatus
  handleSatusSelected: (field: ReserveStatus) => void
  confirm: () => void
}

export const FilterReservesSheetContent = ({
  statusOptions,
  status,
  handleSatusSelected,
  confirm,
}: FilterReservesSheetContentProps) => {
  const { t } = useI18n()

  const RadioButton = ({
    isSelected,
    onPress,
  }: {
    isSelected: boolean
    onPress: () => void
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <PPMaterialIcon
          icon={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={24}
          color={isSelected ? Color.brand1[600] : Color.black[400]}
        />
      </TouchableOpacity>
    )
  }

  const SectionOptionsList = ({
    title,
    options,
    selectedValue,
    onSelect,
  }: {
    title: string
    options: readonly SelectableOption<ReserveStatus>[]
    selectedValue: ReserveStatus
    onSelect: (value: ReserveStatus) => void
  }) => {
    return (
      <>
        <Text style={styles.sortSheetTitle}>{title}</Text>
        {options.map((option, index) => (
          <View key={option.key}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.sortOption}
              onPress={() => onSelect(option.key)}
            >
              <Text style={LabelStyle.body({ color: Color.black[700] })}>
                {t(option.label)}
              </Text>
              <RadioButton
                isSelected={selectedValue === option.key}
                onPress={() => onSelect(option.key)}
              />
            </TouchableOpacity>
          </View>
        ))}
      </>
    )
  }

  return (
    <View>
      <SectionOptionsList
        title={t('reservesScreen.statuses.title')}
        options={statusOptions}
        selectedValue={status}
        onSelect={handleSatusSelected}
      />
      <Button.Primary
        style={{ marginTop: 16 }}
        title={'Confirmar'}
        onPress={confirm}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  sortSheetTitle: {
    ...LabelStyle.title2({ color: Color.black[700] }),
    marginBottom: 8,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
})
