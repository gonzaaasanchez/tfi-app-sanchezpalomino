import React, { FC, ReactNode } from 'react'
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { LabelStyle } from '../style/Styles'
import { Color } from '../style/Color'

enum ButtonState {
  ENABLE,
  DISABLE,
}

type BaseButtonProps = {
  title: string
  state?: ButtonState
  style?: StyleProp<ViewStyle>
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  onPress?: () => void
  variant: 'primary' | 'secondary'
}

const BaseButton: FC<BaseButtonProps> = ({
  title,
  state = ButtonState.ENABLE,
  style,
  leadingIcon,
  trailingIcon,
  onPress = () => {},
  variant,
}): JSX.Element => {
  const isDisabled = state === ButtonState.DISABLE
  const isPrimary = variant === 'primary'
  const buttonStyles = isPrimary
    ? [styles.baseButton, styles.primaryButton, isDisabled && styles.disabled]
    : [styles.baseButton, styles.secondaryButton, isDisabled && styles.disabled]

  const textColor = isPrimary ? 'white' : Color.brand1[500]

  const IconWrapper = ({ icon }: { icon: ReactNode }) => (
    <View style={styles.icon}>{icon}</View>
  )

  const Wrapper = isPrimary ? Pressable : TouchableOpacity

  return (
    <Wrapper
      onPress={!isDisabled ? onPress : undefined}
      style={({ pressed }) => [
        style,
        ...buttonStyles,
        isPrimary && pressed && !isDisabled && styles.primaryPressed,
        !isPrimary && pressed && !isDisabled && styles.secondaryPressed,
      ]}
      activeOpacity={isPrimary ? undefined : 0.6}
    >
      <View style={styles.buttonRow}>
        <IconWrapper icon={leadingIcon} />
        <Text style={[LabelStyle.body, { color: textColor }]}>{title}</Text>
        <IconWrapper icon={trailingIcon} />
      </View>
    </Wrapper>
  )
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
    backgroundColor: 'white',
    borderColor: Color.brand1[200],
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
    flex: 1,
  },
})

export { Button, ButtonState }
