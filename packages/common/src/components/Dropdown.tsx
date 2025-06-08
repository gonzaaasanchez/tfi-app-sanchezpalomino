import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Color } from '../style/Color'
import { LabelStyle } from '../style/Styles'

type DropdownOptionItem = {
  value: string
  label: string
}

interface DropDownProps {
  data: DropdownOptionItem[]
  onFinishSelection: (item: DropdownOptionItem | DropdownOptionItem[]) => void
  placeholder: string
  initialValue?: DropdownOptionItem | DropdownOptionItem[]
  allowsMultiSelection?: boolean
}

const buttonHeight = 48
const buttonMarginTop = 5

export default function Dropdown({
  data,
  onFinishSelection,
  placeholder,
  initialValue,
  allowsMultiSelection = false,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedItems, setSelectedItems] = useState<DropdownOptionItem[]>(
    Array.isArray(initialValue)
      ? initialValue
      : initialValue
        ? [initialValue]
        : []
  )
  const buttonRef = useRef<View>(null)
  const [buttonWidth, setButtonWidth] = useState(0)

  const toggleExpanded = useCallback(() => {
    const newExpanded = !expanded
    if (!newExpanded && allowsMultiSelection) {
      onFinishSelection(selectedItems)
    }
    setExpanded(newExpanded)
  }, [expanded, allowsMultiSelection, onFinishSelection, selectedItems])

  useEffect(() => {
    if (initialValue) {
      setSelectedItems(
        Array.isArray(initialValue) ? initialValue : [initialValue]
      )
    }
  }, [initialValue])

  const onSelectItem = useCallback(
    (item: DropdownOptionItem) => {
      if (allowsMultiSelection) {
        const isSelected = selectedItems.some(
          (selected) => selected.value === item.value
        )
        const newSelectedItems = isSelected
          ? selectedItems.filter((selected) => selected.value !== item.value)
          : [...selectedItems, item]
        setSelectedItems(newSelectedItems)
      } else {
        setSelectedItems([item])
        setExpanded(false)
        onFinishSelection(item)
      }
    },
    [allowsMultiSelection, selectedItems, onFinishSelection]
  )

  const getDisplayValue = useCallback(() => {
    if (selectedItems.length === 0) return ''
    if (selectedItems.length === 1) return selectedItems[0].label
    return `${selectedItems.length} seleccionados`
  }, [selectedItems])

  const isItemSelected = useCallback(
    (item: DropdownOptionItem) => {
      return selectedItems.some((selected) => selected.value === item.value)
    },
    [selectedItems]
  )

  // Measure button width for dropdown
  const onButtonLayout = useCallback((event) => {
    setButtonWidth(event.nativeEvent.layout.width)
  }, [])

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity
        ref={buttonRef}
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
        onLayout={onButtonLayout}
      >
        <Text
          style={LabelStyle.body({
            color: !selectedItems.length && Color.black[400],
          })}
        >
          {getDisplayValue() || placeholder}
        </Text>
        <AntDesign
          name={expanded ? 'caretup' : 'caretdown'}
          color={Color.black[600]}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={[styles.options, { width: buttonWidth, zIndex: 100 }]}>
          <ScrollView style={{ maxHeight: 200 }}>
            {data.map((item) => (
              <TouchableOpacity
                key={item.value}
                activeOpacity={0.8}
                style={styles.optionItem}
                onPress={() => onSelectItem(item)}
              >
                {allowsMultiSelection && (
                  <View style={styles.checkbox}>
                    <View
                      style={[
                        styles.checkboxInner,
                        isItemSelected(item) && styles.checkboxSelected,
                      ]}
                    />
                  </View>
                )}
                <Text style={LabelStyle.body()}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            {data.length > 0 &&
              data.map(
                (item, idx) =>
                  idx < data.length - 1 && (
                    <View key={`sep-${item.value}`} style={styles.separator} />
                  )
              )}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  optionItem: {
    height: 35,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  separator: {
    height: 1,
    backgroundColor: Color.black[10],
    opacity: 0.4,
  },
  options: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Color.black[10],
    maxHeight: 150,
    top: buttonHeight + buttonMarginTop + 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    height: buttonHeight,
    justifyContent: 'space-between',
    backgroundColor: Color.mainBackground,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    paddingVertical: 6,
    marginTop: buttonMarginTop,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  checkboxSelected: {
    backgroundColor: Color.brand1[500],
  },
})
