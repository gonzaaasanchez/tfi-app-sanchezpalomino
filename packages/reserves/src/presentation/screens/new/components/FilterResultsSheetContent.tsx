import React, { useState, useEffect } from 'react'
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
  confirmSortAndOrder: (sortField: SortField, sortOrder: SortOrder) => void
}

export const FilterResultsSheetContent = ({
  sortOptions,
  sortOrderOptions,
  sortField,
  sortOrder,
  confirmSortAndOrder,
}: FilterResultsSheetContentProps) => {
  const { t } = useI18n()
  const [selectedSortField, setSelectedSortField] =
    useState<SortField>(sortField)
  const [selectedSortOrder, setSelectedSortOrder] =
    useState<SortOrder>(sortOrder)

  useEffect(() => {
    setSelectedSortField(sortField)
  }, [sortField])

  useEffect(() => {
    setSelectedSortOrder(sortOrder)
  }, [sortOrder])

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

  const SortFieldOptionsList = () => {
    return (
      <>
        <Text style={styles.sortSheetTitle}>
          {t('reserveResultsScreen.sort.title')}
        </Text>
        {sortOptions.map((option, index) => (
          <View key={option.key}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.sortOption}
              onPress={() => setSelectedSortField(option.key)}
            >
              <Text style={LabelStyle.body({ color: Color.black[700] })}>
                {t(option.label)}
              </Text>
              <RadioButton
                isSelected={selectedSortField === option.key}
                onPress={() => setSelectedSortField(option.key)}
              />
            </TouchableOpacity>
            {index < sortOptions.length - 1 && (
              <View style={styles.separator} />
            )}
          </View>
        ))}
      </>
    )
  }

  const SortOrderOptionsList = () => {
    return (
      <>
        <Text style={styles.sortSheetTitle}>
          {t('reserveResultsScreen.sort.criteria')}
        </Text>
        {sortOrderOptions.map((option, index) => (
          <View key={option.key}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.sortOption}
              onPress={() => setSelectedSortOrder(option.key)}
            >
              <Text style={LabelStyle.body({ color: Color.black[700] })}>
                {t(option.label)}
              </Text>
              <RadioButton
                isSelected={selectedSortOrder === option.key}
                onPress={() => setSelectedSortOrder(option.key)}
              />
            </TouchableOpacity>
            {index < sortOrderOptions.length - 1 && (
              <View style={styles.separator} />
            )}
          </View>
        ))}
      </>
    )
  }

  return (
    <View>
      <SortFieldOptionsList />
      <View style={styles.sectionSeparator} />
      <SortOrderOptionsList />
      <Button.Primary
        style={{ marginTop: 16 }}
        title={t('reserveResultsScreen.sort.confirm')}
        onPress={() =>
          confirmSortAndOrder(selectedSortField, selectedSortOrder)
        }
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
