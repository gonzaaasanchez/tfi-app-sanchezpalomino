import React, { FC, useState } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native'
import { Image } from 'react-native'
import { PPMaterialIcon } from './PPMaterialIcon'
import { Color } from '../style/Color'

type FullscreenImageModalProps = {
  visible: boolean
  imageUri: string | null
  onClose: () => void
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const FullscreenImageModal: FC<FullscreenImageModalProps> = ({
  visible,
  imageUri,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (!imageUri) return null

  const handleImageLoadStart = () => {
    setIsLoading(true)
    setHasError(false)
  }

  const handleImageLoadEnd = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <PPMaterialIcon
            icon="close"
            size={24}
            color={Color.black[50]}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={onClose}
          activeOpacity={1}
        >
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Color.black[50]} />
            </View>
          )}
          
          {hasError && (
            <View style={styles.errorContainer}>
              <PPMaterialIcon
                icon="error"
                size={48}
                color={Color.black[50]}
              />
              <Text style={styles.errorText}>Error al cargar la imagen</Text>
            </View>
          )}
          
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
            onLoadStart={handleImageLoadStart}
            onLoadEnd={handleImageLoadEnd}
            onError={handleImageError}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  errorText: {
    color: Color.black[50],
    marginTop: 16,
    fontSize: 16,
  },
})

export { FullscreenImageModal } 