import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Color } from '../style/Color'

interface CheckboxProps {
  checked: boolean
  onPress: () => void
  disabled?: boolean
  size?: number
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onPress,
  disabled = false,
  size = 20,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        { width: size, height: size },
        disabled && styles.disabled,
      ]}
      onPress={!disabled ? onPress : undefined}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.checkboxInner,
          { width: size * 0.6, height: size * 0.6 },
          checked && styles.checkboxSelected,
        ]}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    borderRadius: 2,
  },
  checkboxSelected: {
    backgroundColor: Color.brand1[500],
  },
  disabled: {
    opacity: 0.5,
  },
})
