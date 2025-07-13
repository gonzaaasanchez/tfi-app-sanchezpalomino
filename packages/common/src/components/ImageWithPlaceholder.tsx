import { FC, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Color } from '../style/Color'
import { PPMaterialIcon } from './PPMaterialIcon'

interface ImageWithPlaceholderProps {
  dimension: number
  source: string | null
}

const ImageWithPlaceholder: FC<ImageWithPlaceholderProps> = ({
  source,
  dimension,
}) => {
  const [hasError, setHasError] = useState(false)

  const containerStyle = {
    ...styles.avatar,
    height: dimension,
    width: dimension,
    borderRadius: dimension / 2,
  }

  const imageStyle = {
    ...styles.image,
    borderRadius: dimension / 2,
  }

  const renderPlaceholder = () => (
    <PPMaterialIcon
      icon="pets"
      size={dimension / 2.5}
      color={Color.brand1[700]}
    />
  )

  if (!source) {
    return <View style={containerStyle}>{renderPlaceholder()}</View>
  }

  if (hasError) {
    return <View style={containerStyle}>{renderPlaceholder()}</View>
  }

  return (
    <View style={containerStyle}>
      <View style={styles.placeholderContainer}>{renderPlaceholder()}</View>
      <Image
        source={{ uri: source }}
        resizeMode="cover"
        style={imageStyle}
        onError={() => setHasError(true)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Color.brand1[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.brand1[300],
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  placeholderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
})

export default ImageWithPlaceholder
