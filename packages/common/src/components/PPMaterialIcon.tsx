import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Color } from '../style/Color'

type MaterialIconsName = keyof typeof MaterialIcons.glyphMap
type MaterialCommunityIconsName = keyof typeof MaterialCommunityIcons.glyphMap
type PPMaterialIconsName = MaterialIconsName | MaterialCommunityIconsName

type PPMaterialIconProps = {
  icon: PPMaterialIconsName
  size?: number
  color?: string
}

const PPMaterialIcon: React.FC<PPMaterialIconProps> = ({
  icon,
  size = 15,
  color = Color.black[500],
}) => {
  if (icon in MaterialCommunityIcons.glyphMap) {
    return (
      <MaterialCommunityIcons
        name={icon as MaterialCommunityIconsName}
        size={size}
        color={color}
      />
    )
  } else if (icon in MaterialIcons.glyphMap) {
    return (
      <MaterialIcons
        name={icon as MaterialIconsName}
        size={size}
        color={color}
      />
    )
  } else {
    console.warn(`The icon "${icon}" was not found.`)
    return null
  }
}

export { PPMaterialIcon, PPMaterialIconsName }
