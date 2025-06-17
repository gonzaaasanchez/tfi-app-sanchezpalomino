import React, { FC, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Color,
  PetModel,
  GeneralStyle,
  LabelStyle,
  PPMaterialIcon,
  PetDetail,
  useBottomSheetModalRef,
  PPBottomSheet,
  PPBottomSheetContainer,
} from '@packages/common'
import { useNavigation, StackActions } from '@react-navigation/native'

const mockPets: PetModel[] = [
  {
    id: 'p1',
    name: 'Rogelio',
    comment:
      'Rogelito es mi gato más grande. Es mimoso pero muy guardián de su casa, cuando llega alguien nuevo no se deja tocar y está atento a todos sus movimientos. Le gusta mucho que le pasen el cepillo y odia mucho el calor, por eso se tira bajo el aire acondicionado en verano.',
    photoUrl:
      'https://instagram.fros8-1.fna.fbcdn.net/v/t51.2885-15/60510719_134536037725582_7013006993875771381_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTM1MC5zZHIuZjI4ODUuZGVmYXVsdF9pbWFnZSJ9&_nc_ht=instagram.fros8-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QHlnu1PZS7P8mVKxfS6mMC1JAz1PKNUO0JyQdsrKtANHS4yFrp81fJHWQ3YBwgsWMI&_nc_ohc=v1DcXewfH4YQ7kNvwGPGRSJ&_nc_gid=0yMNDRyQP6lQiRXcttEJjQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MjA0OTcyNTUyMjMwNDMyNzMyOA%3D%3D.3-ccb7-5&oh=00_AfP6pt31WqcBGUTWVNmJXc8x1DEgJhMNRJmEzBb7c7KKOQ&oe=68564C20&_nc_sid=22de04',
    type: { id: '2', name: 'Gato' },
    characteristics: [
      { id: '1', name: 'Tamaño', value: 'Grande' },
      { id: '2', name: 'Edad', value: '10' },
      { id: '3', name: 'Personalidad', value: 'Tranquilo' },
      { id: '4', name: 'Necesita medicación', value: 'No' },
    ],
  },
  {
    id: 'p2',
    name: 'Vicente',
    comment:
      'Vicentito es el hermano menor de Rogelio. Es muy amistoso y cuando conoce a alguien enseguida grita para pedir atención. Le encantan los mimos pero no le gustan los besos ni estar alzado.',
    photoUrl:
      'https://instagram.fros8-1.fna.fbcdn.net/v/t51.29350-15/217460786_1431648433881391_480789146672365214_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fros8-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QE_mjJlswOstLAGan_cPL2qZva2DM70XHnGAepTWQivncoJBF36nCFwebJMaxp1SIU&_nc_ohc=Kj_SmQtqc3wQ7kNvwEXQdj6&_nc_gid=deqdhg0JA5WbRdMsBI6oIA&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MjYxNzc2MjQzNDIzNjk4MzIxMw%3D%3D.3-ccb7-5&oh=00_AfP6A56QkxdOrxKUu2wwzEkvUeCIpPFyIZ8Zcab30-f4iw&oe=68565EA4&_nc_sid=22de04',
    type: { id: '2', name: 'Gato' },
    characteristics: [
      { id: '1', name: 'Tamaño', value: 'Pequeño' },
      { id: '2', name: 'Edad', value: '3' },
      { id: '3', name: 'Personalidad', value: 'Tranquilo' },
      { id: '4', name: 'Necesita medicación', value: 'No' },
    ],
  },
]

const PetCard: FC<{ pet: PetModel; onPress: () => void }> = ({
  pet,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: pet.photoUrl }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.petName}>{pet.name}</Text>
          <View style={styles.row}>
            <PPMaterialIcon icon="paw" size={16} />
            <Text style={styles.detail}>{pet.type.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const PetsScreen: FC = (): JSX.Element => {
  const [petDetail, setPetDetail] = useState<PetModel | null>(null)
  const petDetailModalRef = useBottomSheetModalRef()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  useEffect(() => {
    if (petDetail) {
      petDetailModalRef.current?.present()
    }
  }, [petDetail])

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {mockPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onPress={() => setPetDetail(pet)} />
          ))}
        </ScrollView>
      </SafeAreaView>
      <PPBottomSheet.Empty
        ref={petDetailModalRef}
        dismisseable={true}
        onDismiss={() => setPetDetail(null)}
      >
        <PetDetail pet={petDetail} />
      </PPBottomSheet.Empty>
      <TouchableOpacity
        style={{
          ...GeneralStyle.addFloatingButton,
          bottom: insets.bottom + 20,
        }}
        onPress={() => {
          navigation.dispatch(StackActions.push('petsNew'))
        }}
      >
        <PPMaterialIcon icon="add" size={30} color={'white'} />
      </TouchableOpacity>
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.brand2[100],
  },
  scrollContainer: {
    padding: 20,
  },
  cardContainer: {
    ...GeneralStyle.card,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
  },
  leftContainer: {
    marginRight: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Color.brand1[100],
    borderWidth: 1,
    borderColor: Color.brand1[300],
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  petName: {
    ...LabelStyle.body({ fontWeight: 600, color: Color.black[700] }),
  },
  detail: {
    ...LabelStyle.callout2({ color: Color.black[500] }),
    marginLeft: 6,
    flexShrink: 1,
  },
})

export { PetsScreen }
