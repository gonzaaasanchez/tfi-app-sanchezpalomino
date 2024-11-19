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

type PPBottomSheetProps = {
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
const PPBottomSheet = forwardRef<BottomSheetModal, PPBottomSheetProps>(
  (
    {
      title,
      subtitle,
      lottieFile,
      primaryActionTitle,
      secondaryActionTitle,
      onPrimaryAction,
      onSecondaryAction,
      dismisseable = true,
      onDismiss,
    },
    ref
  ) => {
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
        onDismiss={onDismiss ?? defaultDissmiss}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop
            pressBehavior={dismisseable === true ? 'close' : 'none'}
            animatedIndex={backdropProps.animatedIndex}
            animatedPosition={backdropProps.animatedPosition}
            style={[backdropProps.style]}
            opacity={1}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView style={styles.view}>
          <View style={styles.textContainer}>
            {lottieFile && (
              <LottieView
                autoPlay={true}
                ref={animation}
                style={styles.animation}
                source={lottieFile}
              />
            )}

            {title && (
              <Text style={[LabelStyle.title1, { textAlign: 'center' }]}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={[LabelStyle.callout, { textAlign: 'center' }]}>
                {subtitle}
              </Text>
            )}
          </View>

          <View>
            <Button.Primary
              title={primaryActionTitle ?? t('general.accept')}
              onPress={onPrimaryAction ?? defaultDissmiss}
            />

            {secondaryActionTitle && (
              <Button.Secondary
                title={secondaryActionTitle}
                onPress={onSecondaryAction ?? defaultDissmiss}
              />
            )}
          </View>
        </BottomSheetView>
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

export { PPBottomSheet }
