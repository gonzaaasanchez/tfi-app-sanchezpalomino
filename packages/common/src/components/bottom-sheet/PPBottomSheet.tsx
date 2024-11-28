import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { forwardRef, useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useI18n } from '../../domain/hooks/i18n'
import { LabelStyle } from '../../style/Styles'
import { Button } from '../Button'
import LottieView, { AnimationObject } from 'lottie-react-native'

type PPBottomSheetEmptyProps = {
  variant?: 'empty'
  dismisseable?: boolean
  onDismiss?: () => void
  children?: JSX.Element
}

type PPBottomSheetLayoutProps = {
  variant?: 'layout'
  title: string
  subtitle?: string
  lottieFile?: string | AnimationObject | { uri: string }
  primaryActionTitle?: string
  secondaryActionTitle?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  dismisseable?: boolean
  onDismiss?: () => void
}

type PPBottomSheetProps = PPBottomSheetEmptyProps | PPBottomSheetLayoutProps

const PPBottomSheet = {
  Empty: forwardRef<BottomSheetModal, Omit<PPBottomSheetEmptyProps, 'variant'>>(
    (props, ref) => <BasePPBottomSheet {...props} ref={ref} variant="empty" />
  ),
  Layout: forwardRef<
    BottomSheetModal,
    Omit<PPBottomSheetLayoutProps, 'variant'>
  >((props, ref) => (
    <BasePPBottomSheet {...props} ref={ref} variant="layout" />
  )),
}

const BasePPBottomSheet = forwardRef<BottomSheetModal, PPBottomSheetProps>(
  (props, ref) => {
    const { variant } = props
    const { t } = useI18n()
    const animation = useRef<LottieView>(null)

    const defaultDissmiss = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.dismiss()
      }
    }

    return (
      <BottomSheetModal
        ref={ref}
        onDismiss={props.onDismiss ?? defaultDissmiss}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop
            pressBehavior={props.dismisseable === true ? 'close' : 'none'}
            animatedIndex={backdropProps.animatedIndex}
            animatedPosition={backdropProps.animatedPosition}
            style={[backdropProps.style]}
            opacity={1}
            disappearsOnIndex={-1}
          />
        )}
      >
        {variant === 'empty' && props?.children}

        {variant === 'layout' && (
          <BottomSheetView style={styles.view}>
            <View style={styles.textContainer}>
              {props.lottieFile && (
                <LottieView
                  autoPlay={true}
                  ref={animation}
                  style={styles.animation}
                  source={props.lottieFile}
                />
              )}

              {props.title && (
                <Text style={[LabelStyle.title1(), { textAlign: 'center' }]}>
                  {props.title}
                </Text>
              )}
              {props.subtitle && (
                <Text style={[LabelStyle.callout(), { textAlign: 'center' }]}>
                  {props.subtitle}
                </Text>
              )}
            </View>

            <View>
              <Button.Primary
                title={props.primaryActionTitle ?? t('general.accept')}
                onPress={props.onPrimaryAction ?? defaultDissmiss}
              />

              {props.secondaryActionTitle && (
                <Button.Secondary
                  title={props.secondaryActionTitle}
                  onPress={props.onSecondaryAction ?? defaultDissmiss}
                />
              )}
            </View>
          </BottomSheetView>
        )}
      </BottomSheetModal>
    )
  }
)

const styles = StyleSheet.create({
  view: {
    padding: 34,
    paddingTop: 10,
    gap: 27,
  },
  textContainer: {
    gap: 8,
  },
  animation: {
    alignSelf: 'center',
    height: 180,
    aspectRatio: 1,
  },
})

const useBottomSheetModalRef = () => useRef<BottomSheetModal>(null)
export { PPBottomSheet, useBottomSheetModalRef }
