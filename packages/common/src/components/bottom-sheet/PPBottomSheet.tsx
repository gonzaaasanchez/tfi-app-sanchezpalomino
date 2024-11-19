import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { forwardRef } from 'react'
import { ImageSourcePropType, View, StyleSheet, Text } from 'react-native'
import { useI18n } from '../../domain/hooks/i18n'
import { LabelStyle } from '../../style/Styles'
import { Button } from '../Button'

type PPBottomSheetProps = {
  title: string
  subtitle?: string
  icon?: ImageSourcePropType
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
      icon,
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
            {/* <Image source={icon} style={styles.image} /> */}
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
  image: {
    alignSelf: 'center',
    width: 48,
    height: 48,
  },
})

export { PPBottomSheet }
