import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Color } from '../style/Color'
import { PPMaterialIcon } from './PPMaterialIcon'

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
        styles.touchableArea,
        disabled && styles.disabled,
      ]}
      onPress={!disabled ? onPress : undefined}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.checkbox,
          { width: size, height: size },
        ]}
      >
        {checked && (
          <PPMaterialIcon
            icon="paw"
            size={size * 0.8}
            color={Color.brand1[600]}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableArea: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.brand1[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
})