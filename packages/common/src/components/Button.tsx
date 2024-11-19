import React, { FC, ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { LabelStyle } from '../style/Styles'
import { Color } from '../style/Color'

enum ButtonState {
  ENABLE,
  DISABLE,
}

type BaseButtonProps = {
  title: string
  state?: ButtonState
  style?: ViewStyle
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  onPress: () => void
  variant: 'primary' | 'secondary'
}

const Button: any = (props: Omit<BaseButtonProps, 'variant'>) => {
  return <BaseButton {...props} variant="primary" />
}

Button.Primary = (props: Omit<BaseButtonProps, 'variant'>) => (
  <BaseButton {...props} variant="primary" />
)

Button.Secondary = (props: Omit<BaseButtonProps, 'variant'>) => (
  <BaseButton {...props} variant="secondary" />
)

const BaseButton: FC<BaseButtonProps> = ({
  title,
  state = ButtonState.ENABLE,
  style,
  leadingIcon,
  trailingIcon,
  onPress,
  variant,
}) => {
  const isDisabled = state === ButtonState.DISABLE
  const isPrimary = variant === 'primary'

  return (
    <Pressable
      onPress={!isDisabled ? onPress : undefined}
      style={({ pressed }) => [
        styles.baseButton,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        isDisabled && styles.disabled,
        pressed &&
          !isDisabled &&
          (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
        style,
      ]}
    >
      <View style={styles.buttonRow}>
        {leadingIcon && <View style={styles.icon}>{leadingIcon}</View>}
        <Text
          style={[
            LabelStyle.body,
            { color: isPrimary ? 'white' : Color.black[800] },
          ]}
        >
          {title}
        </Text>
        {trailingIcon && <View style={styles.icon}>{trailingIcon}</View>}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 50,
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  primaryButton: {
    backgroundColor: Color.brand1[700],
  },
  primaryPressed: {
    backgroundColor: Color.brand1[600],
  },
  secondaryButton: {
    backgroundColor: Color.brand1[50],
    borderColor: Color.brand1[100],
    borderWidth: 1,
  },
  secondaryPressed: {
    backgroundColor: Color.brand1[100],
  },
  disabled: {
    opacity: 0.6,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    alignItems: 'center',
  },
})

export { Button, ButtonState }
