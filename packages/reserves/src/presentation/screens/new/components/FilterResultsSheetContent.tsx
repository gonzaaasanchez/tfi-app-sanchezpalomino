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
import { SortField, SortOrder } from '../../../../data/models/SearchCriteria'

type FilterResultsSheetContentProps = {
  sortOptions: readonly SelectableOption<SortField>[]
  sortOrderOptions: readonly SelectableOption<SortOrder>[]
  sortField: SortField
  sortOrder: SortOrder
  handleSortOptionPress: (field: SortField) => void
  handleSortOrderPress: (order: SortOrder) => void
  confirmSortAndOrder: () => void
}

export const FilterResultsSheetContent = ({
  sortOptions,
  sortOrderOptions,
  sortField,
  sortOrder,
  handleSortOptionPress,
  handleSortOrderPress,
  confirmSortAndOrder,
}: FilterResultsSheetContentProps) => {
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
    options: readonly SelectableOption<T>[]
    selectedValue: T
    onSelect: (value: T) => void
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
