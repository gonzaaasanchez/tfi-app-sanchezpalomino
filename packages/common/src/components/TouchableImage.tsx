import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import ImageWithPlaceholder from './ImageWithPlaceholder'

type TouchableImageProps = {
  source: string | null
  dimension: number
  onPress?: () => void
  disabled?: boolean
}

const TouchableImage: FC<TouchableImageProps> = ({
  source,
  dimension,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || !source}
      activeOpacity={0.8}
    >
      <ImageWithPlaceholder
        source={source}
        dimension={dimension}
      />
    </TouchableOpacity>
  )
}

export { TouchableImage } 