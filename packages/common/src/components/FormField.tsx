import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { LabelStyle } from '../style/Styles'
import { Color, StateColor } from '../style/Color'

interface FormFieldProps {
  label?: string
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  onBlur?: (text: string) => void
  error?: string
  placeholder?: string
  secureTextEntry?: boolean
  disabled?: boolean
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  defaultValue,
  onChangeText,
  onBlur,
  error,
  placeholder,
  secureTextEntry,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={{
            ...LabelStyle.body2({ fontWeight: 500, color: Color.black[700] }),
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input, 
          error && styles.inputError,
          disabled && styles.inputDisabled
        ]}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        onBlur={(e) => onBlur?.(e.nativeEvent.text)}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={disabled ? Color.black[300] : Color.black[400]}
        editable={!disabled}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  input: {
    ...LabelStyle.body(),
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 5,
    height: 48,
  },
  inputError: {
    borderColor: StateColor.error.default,
  },
  inputDisabled: {
    backgroundColor: Color.black[50],
    borderColor: Color.black[200],
    color: Color.black[400],
  },
  errorText: {
    ...LabelStyle.body2({ color: StateColor.error.default }),
    marginTop: 4,
  },
})
