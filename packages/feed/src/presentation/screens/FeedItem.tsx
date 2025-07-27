import {
  Color,
  DateUtils,
  FeedModel,
  GeneralStyle,
  getImageFullUrl,
  LabelStyle,
} from '@packages/common'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'

type FeedItemProps = {
  item: FeedModel
  baseUrl: string
  onLike: () => void
  onComment: () => void
}

const FeedItem: FC<FeedItemProps> = ({ item, baseUrl, onLike, onComment }) => {
  const fullName = `${item.author.firstName} ${item.author.lastName}`

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: getImageFullUrl(item.image, baseUrl) }}
        style={styles.image}
      />
      <View style={styles.nameContainer}>
        <Text style={LabelStyle.callout2({ color: Color.black[500] })}>
          {fullName}
        </Text>
        <Text style={LabelStyle.link2({ color: Color.black[500] })}>
          {DateUtils.DDMMYYYY(item.updatedAt)}
        </Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.divider} />
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={onLike}
        >
          <MaterialIcons
            name="thumb-up"
            size={16}
            color={item.hasLiked ? Color.brand1[600] : Color.black[300]}
          />
          <Text style={styles.actionText}>{item.likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={onComment}
        >
          <MaterialIcons name="comment" size={16} color={Color.black[300]} />
          <Text style={styles.actionText}>{item.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    ...GeneralStyle.card,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  title: {
    ...LabelStyle.title3({ fontSize: 15 }),
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  description: {
    ...LabelStyle.callout2({ color: Color.black[600] }),
    paddingTop: 2,
    paddingHorizontal: 12,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Color.black[100],
    marginTop: 10,
    marginHorizontal: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    ...LabelStyle.link2({ color: Color.black[400] }),
  },
})

export { FeedItem }
