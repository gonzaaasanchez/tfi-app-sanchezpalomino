import React, { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Color, LabelStyle, FeedModel } from '@packages/common'
import { FeedItem } from './FeedItem'

const tabbarAproxHeight = 150

const mockData: FeedModel[] = [
  {
    id: '1',
    title: '"Sacame una así como que no me di cuenta"',
    description:
      'Eso le dije a mi fotógrafo personal.\nMe presento: soy Rogelito y soy mi propio CM.\nSoy un gatito de gustos simples: entre  10 y 12 siestas al día, una cajita de piedras siempre limpia, sobrecito ProPlan y un Karen Macho que siempre me acaricia la pancita. ¿Qué más se puede pedir en esta vida?',
    date: '2024-11-25',
    imageUrl:
      'https://instagram.fros8-1.fna.fbcdn.net/v/t51.2885-15/60510719_134536037725582_7013006993875771381_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTM1MC5zZHIuZjI4ODUuZGVmYXVsdF9pbWFnZSJ9&_nc_ht=instagram.fros8-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QHlnu1PZS7P8mVKxfS6mMC1JAz1PKNUO0JyQdsrKtANHS4yFrp81fJHWQ3YBwgsWMI&_nc_ohc=v1DcXewfH4YQ7kNvwGPGRSJ&_nc_gid=0yMNDRyQP6lQiRXcttEJjQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MjA0OTcyNTUyMjMwNDMyNzMyOA%3D%3D.3-ccb7-5&oh=00_AfP6pt31WqcBGUTWVNmJXc8x1DEgJhMNRJmEzBb7c7KKOQ&oe=68564C20&_nc_sid=22de04',
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
      'https://acdn-us.mitiendanube.com/stores/002/707/184/products/anteojos1-8eb89d46f969ca368a17058902208805-1024-1024.png',
    likes: 80,
    comments: 30,
    userLiked: false,
    user: {
      firstname: 'María',
      lastname: 'González',
    },
  },
]

const FeedScreen: FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedItem item={item} />}
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
})

export { FeedScreen }
