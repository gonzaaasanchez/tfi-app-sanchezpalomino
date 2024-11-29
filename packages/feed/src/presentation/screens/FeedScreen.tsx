import React, { FC } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons' // Para los íconos de like y comentarios
import { Color, useI18n, LabelStyle, DateUtils } from '@packages/common'

type FeedItem = {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
  likes: number
  comments: number
  userLiked: boolean
  user: {
    firstname: string
    lastname: string
  }
}

const mockData: FeedItem[] = [
  {
    id: '1',
    title: '"Sacame una así como que no me di cuenta"',
    description:
      'Eso le dije a mi fotógrafo personal.\nMe presento: soy Rogelito y soy mi propio CM.\nSoy un gatito de gustos simples: entre  10 y 12 siestas al día, una cajita de piedras siempre limpia, sobrecito ProPlan y un Karen Macho que siempre me acaricia la pancita. ¿Qué más se puede pedir en esta vida?',
    date: '2024-11-25',
    imageUrl:
      'https://scontent.fros2-1.fna.fbcdn.net/v/t1.6435-9/184636073_10158208025062286_8679982414475535144_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LmsBxn9NlTAQ7kNvgF_Mui4&_nc_zt=23&_nc_ht=scontent.fros2-1.fna&_nc_gid=AJVYJA_DyqRqNt84zjpRtgc&oh=00_AYBBwu2nxR88K_gOczx5OiryXg6PxZE2mdStKIpPPVEeJw&oe=67715607',
    likes: 120,
    comments: 45,
    userLiked: true,
    user: {
      firstname: 'Gonzalo',
      lastname: 'Sanchez',
    },
  },
  {
    id: '2',
    title: 'Mi primer posteo de Fito',
    description:
      'Le hicimos una sesión de fotos a Fito en casa y no tuvo mejor idea que poner esta cara.. ¡Está loco! Espero que ningún cuidador se espante a ver estas muecas 🤪 🤪 🤪',
    date: '2024-11-25',
    imageUrl:
      'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85',
    likes: 120,
    comments: 45,
    userLiked: true,
    user: {
      firstname: 'Joaquín',
      lastname: 'McAllister',
    },
  },
  {
    id: '3',
    title: '¡Hola! Soy Bowie',
    description:
      'En mi hogar son fanáticos de David Bowie...¿ahora entienden por qué me llamo así? Esta es una foto que me sacaron un día que estaba disfrazado para ir a una fiesta.',
    date: '2024-11-24',
    imageUrl:
      'https://scontent.fros2-1.fna.fbcdn.net/v/t39.30808-6/461557928_1093580948803106_1806034042826433455_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=0kdAnZAPvA8Q7kNvgFrgsSa&_nc_zt=23&_nc_ht=scontent.fros2-1.fna&_nc_gid=AQ1L96kmRfnl4bGiaZbhzcJ&oh=00_AYCJdNk4hj2L_L1-5RS1s8o7JqWW4kyeHI3Py4d8-GSnpw&oe=675016ED',
    likes: 80,
    comments: 30,
    userLiked: false,
    user: {
      firstname: 'María',
      lastname: 'González',
    },
  },
]

const tabbarAproxHeight = 150

const FeedScreen: FC = (): JSX.Element => {
  const { t } = useI18n()

  const renderItem = ({ item }: { item: FeedItem }) => {
    const fullName = `${item.user.firstname} ${item.user.lastname}`

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.nameContainer}>
          <Text style={LabelStyle.callout2({ color: Color.black[500] })}>
            {fullName}
          </Text>
          <Text style={LabelStyle.link2({ color: Color.black[500] })}>
            {DateUtils.MMDDYYYY(item.date)}
          </Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.divider} />
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons
              name="thumb-up"
              size={16}
              color={item.userLiked ? Color.brand1[600] : Color.black[300]}
            />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="comment" size={16} color={Color.black[300]} />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  list: {
    paddingBottom: tabbarAproxHeight,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    aspectRatio: 1.3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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

export { FeedScreen }
