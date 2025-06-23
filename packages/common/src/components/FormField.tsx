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
  multiline?: boolean
  numberOfLines?: number
  rightComponent?: React.ReactNode
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
  multiline = false,
  numberOfLines = 1,
  rightComponent,
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
      <View
        style={[
          styles.inputContainer,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          multiline && styles.inputMultiline,
        ]}
      >
        <TextInput
          style={[styles.input, multiline && styles.inputMultiline]}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          onBlur={(e) => onBlur?.(e.nativeEvent.text)}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={disabled ? Color.black[300] : Color.black[400]}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        {rightComponent && (
          <View style={styles.rightComponent}>{rightComponent}</View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    marginTop: 5,
    height: 48,
  },
  input: {
    ...LabelStyle.body(),
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rightComponent: {
    paddingRight: 12,
  },
  inputError: {
    borderColor: StateColor.error.default,
  },
  inputDisabled: {
    backgroundColor: Color.black[50],
    borderColor: Color.black[200],
  },
  errorText: {
    ...LabelStyle.body2({ color: StateColor.error.default }),
    marginTop: 4,
  },
  inputMultiline: {
    height: 'auto',
    minHeight: 75,
    paddingVertical: 5,
  },
})
