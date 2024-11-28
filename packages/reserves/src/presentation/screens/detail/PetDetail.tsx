import { Color, LabelStyle, PetModel, useI18n } from '@packages/common'
import { View, Image, Text, StyleSheet } from 'react-native'
import { DetailItem } from './DetailItem'
import { FC } from 'react'

type PetDetailSheetProps = {
  pet: PetModel
}

const PetDetail: FC<PetDetailSheetProps> = ({ pet }) => {
  const { t } = useI18n()

  return (
    <View style={{ paddingBottom: 20 }}>
      <Image style={styles.petImage} source={{ uri: pet?.photoUrl }} />
      <Text style={styles.petName}>{pet?.name}</Text>
      <Text style={styles.petType}>{`(${pet?.type.name})`}</Text>
      <Text style={styles.petComment}>{pet?.comment}</Text>
      <Text style={styles.petCharacteristicsTitle}>
        {t('reserveDetailScreen.petDetails')}
      </Text>
      {pet.characteristics?.map((characteristic) => (
        <View key={characteristic.id}>
          <DetailItem
            icon="pets"
            iconSize={14}
            iconTopPadding={2}
            title={`${characteristic.name}: `}
            value={`${characteristic.value}`}
          />
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },
  petName: {
    ...LabelStyle.title1(),
    textAlign: 'center',
  },
  petType: {
    ...LabelStyle.callout2(),
    textAlign: 'center',
    color: Color.black[500],
  },
  petComment: {
    ...LabelStyle.callout2({ fontWeight: 200 }),
    paddingVertical: 20,
    color: Color.black[800],
  },
  petCharacteristicsTitle: {
    ...LabelStyle.body({ textAlign: 'center' }),
    paddingBottom: 10,
    color: Color.black[800],
  },
})

export { PetDetail }
