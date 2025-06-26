import React from 'react'
import {
  Color,
  PPMaterialIcon,
  LabelStyle,
  useI18n,
  Button,
} from '@packages/common'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text } from 'react-native'
import {
  SortOptionDatasource,
  OrderOptionDatasource,
} from '../../../viewModels/ReservationResultsViewModel'
import { SortField, SortOrder } from '../../../../data/models/SearchCriteria'

type FilterSheetContentProps = {
  sortOptions: readonly SortOptionDatasource[]
  sortOrderOptions: readonly OrderOptionDatasource[]
  sortField: SortField
  sortOrder: SortOrder
  handleSortOptionPress: (field: SortField) => void
  handleSortOrderPress: (order: SortOrder) => void
  confirmSortAndOrder: () => void
}

export const FilterSheetContent = ({
  sortOptions,
  sortOrderOptions,
  sortField,
  sortOrder,
  handleSortOptionPress,
  handleSortOrderPress,
  confirmSortAndOrder,
}: FilterSheetContentProps) => {
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

  const SectionOptionsList = <T extends SortField | SortOrder>({
    title,
    options,
    selectedValue,
    onSelect,
  }: {
    title: string
    options: readonly { readonly field: T; readonly label: string }[]
    selectedValue: T
    onSelect: (value: T) => void
  }) => {
    return (
      <>
        <Text style={styles.sortSheetTitle}>{title}</Text>
        {options.map((option, index) => (
          <View key={option.field}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.sortOption}
              onPress={() => onSelect(option.field)}
            >
              <Text style={LabelStyle.body({ color: Color.black[700] })}>
                {t(option.label)}
              </Text>
              <RadioButton
                isSelected={selectedValue === option.field}
                onPress={() => onSelect(option.field)}
              />
            </TouchableOpacity>
            {index < options.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </>
    )
  }

  return (
    <View>
      <SectionOptionsList
        title={t('reserveResultsScreen.sort.title')}
        options={sortOptions}
        selectedValue={sortField}
        onSelect={handleSortOptionPress}
      />
      <View style={styles.sectionSeparator} />
      <SectionOptionsList
        title={t('reserveResultsScreen.sort.criteria')}
        options={sortOrderOptions}
        selectedValue={sortOrder}
        onSelect={handleSortOrderPress}
      />
      <Button.Primary
        style={{ marginTop: 16 }}
        title={t('reserveResultsScreen.sort.confirm')}
        onPress={confirmSortAndOrder}
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
  separator: {
    height: 1,
    backgroundColor: Color.black[100],
  },
  sectionSeparator: {
    height: 10,
  },
})
