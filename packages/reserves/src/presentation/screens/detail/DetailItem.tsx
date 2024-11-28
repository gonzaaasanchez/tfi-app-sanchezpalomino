import { Color, LabelStyle, PPMaterialIcon, PPMaterialIconsName } from '@packages/common'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

const DetailItem: React.FC<{
  icon: PPMaterialIconsName
  iconSize?: number
  iconTopPadding?: number
  title?: string
  value: string
  onPress?: () => void
}> = ({
  iconSize = 15,
  iconTopPadding: neededIconPadding = 1,
  icon,
  title = null,
  value,
  onPress = null,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.6 : 1}
      onPress={onPress || undefined}
    >
      <View style={styles.detailContainerItem}>
        <View style={{ marginTop: neededIconPadding }}>
          <PPMaterialIcon icon={icon} size={iconSize} />
        </View>
        <View style={styles.detailContainerTitleSubtitle}>
          {title && (
            <Text style={styles.detailContainerTitleText}>{title}</Text>
          )}
          <Text
            style={{
              ...styles.detailContainerValueText,
              ...(title && { paddingLeft: 0 }),
            }}
          >
            {value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  detailContainerItem: {
    flexDirection: 'row',
  },
  detailContainerTitleSubtitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingRight: 20,
  },
  detailContainerTitleText: {
    ...LabelStyle.body2({ fontWeight: 500, color: Color.black[700] }),
    paddingLeft: 5,
    flexShrink: 0,
  },
  detailContainerValueText: {
    ...LabelStyle.callout2({ color: Color.black[500] }),
    paddingLeft: 5,
    flexShrink: 1,
    flexGrow: 1,
    minWidth: 0,
  },
})

export { DetailItem }
