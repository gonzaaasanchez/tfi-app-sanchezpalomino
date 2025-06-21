import React, { FC } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Color } from '../style/Color'
import { LabelStyle } from '../style/Styles'
import { useI18n } from '../domain/hooks/i18n'
import { PPMaterialIcon } from './PPMaterialIcon'

const ImagePickerOptions: FC<{
  handleImageSelection: (source: 'camera' | 'gallery') => void
  onDismiss: () => void
}> = ({ handleImageSelection, onDismiss }): JSX.Element => {
  const { t } = useI18n()

  return (
    <View style={styles.imagePickerContainer}>
      <Text style={styles.imagePickerTitle}>
        {t('profileScreen.selectImage.title')}
      </Text>

      <TouchableOpacity
        style={styles.imagePickerOption}
        onPress={() => handleImageSelection('camera')}
      >
        <PPMaterialIcon icon="camera-alt" size={24} color={Color.brand1[700]} />
        <Text style={styles.imagePickerOptionText}>
          {t('profileScreen.selectImage.camera')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imagePickerOption}
        onPress={() => handleImageSelection('gallery')}
      >
        <PPMaterialIcon
          icon="photo-library"
          size={24}
          color={Color.brand1[700]}
        />
        <Text style={styles.imagePickerOptionText}>
          {t('profileScreen.selectImage.gallery')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagePickerCancel} onPress={onDismiss}>
        <Text style={styles.imagePickerCancelText}>{t('general.cancel')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePickerContainer: {
    gap: 16,
  },
  imagePickerTitle: {
    ...LabelStyle.title3({ textAlign: 'center', color: Color.black[700] }),
    marginBottom: 10,
  },
  imagePickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Color.brand2[50],
    borderRadius: 12,
    gap: 12,
  },
  imagePickerOptionText: {
    ...LabelStyle.body({ color: Color.black[700] }),
  },
  imagePickerCancel: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  imagePickerCancelText: {
    ...LabelStyle.body({ color: Color.brand1[700] }),
  },
})

export { ImagePickerOptions }
