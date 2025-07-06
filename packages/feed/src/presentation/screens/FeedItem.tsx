import { Color, DateUtils, FeedModel, GeneralStyle, LabelStyle } from '@packages/common'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'

type FeedItemProps = {
  item: FeedModel
}

const FeedItem: FC<FeedItemProps> = ({ item }) => {
  const fullName = `${item.user.firstname} ${item.user.lastname}`

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.nameContainer}>
        <Text style={LabelStyle.callout2({ color: Color.black[500] })}>
          {fullName}
        </Text>
        <Text style={LabelStyle.link2({ color: Color.black[500] })}>
          {DateUtils.DDMMYYYY(item.date)}
        </Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.divider} />
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <MaterialIcons
            name="thumb-up"
            size={16}
            color={item.userLiked ? Color.brand1[600] : Color.black[300]}
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <MaterialIcons name="comment" size={16} color={Color.black[300]} />
          <Text style={styles.actionText}>{item.comments}</Text>
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
    aspectRatio: 1.3,
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
    marginTop: 7,
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
