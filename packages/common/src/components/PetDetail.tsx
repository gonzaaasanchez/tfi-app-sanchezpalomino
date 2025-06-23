import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FC } from 'react'
import { useI18n } from '../domain/hooks/i18n'
import { PetModel } from '../data/models/PetModel'
import { DetailItem } from './DetailItem'
import { LabelStyle } from '../style/Styles'
import { Color } from '../style/Color'
import ImageWithPlaceholder from './ImageWithPlaceholder'
import { getImageFullUrl } from '../utils/ImageUtils'

type PetDetailSheetProps = {
  pet: PetModel
  baseUrl: string
  handlers?: {
    onEdit: () => void
    onDelete: () => void
  }
}

const PetDetail: FC<PetDetailSheetProps> = ({ pet, baseUrl, handlers }) => {
  const { t } = useI18n()

  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={{ alignItems: 'center', paddingBottom: 10 }}>
        <ImageWithPlaceholder
          source={getImageFullUrl(pet.avatar, baseUrl)}
          dimension={120}
        />
      </View>
      <Text style={styles.petName}>{pet?.name}</Text>
      <Text style={styles.petType}>{`(${pet?.petType?.name})`}</Text>
      <Text style={styles.petComment}>{pet?.comment}</Text>
      <Text style={styles.petCharacteristicsTitle}>
        {t('reserveDetailScreen.petDetails')}
      </Text>
      {pet.characteristics?.map((characteristic, index) => (
        <View key={characteristic._id || index}>
          <DetailItem
            icon="pets"
            iconSize={14}
            iconTopPadding={2}
            title={`${characteristic.name}: `}
            value={`${characteristic.value}`}
          />
        </View>
      ))}
      {handlers && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handlers.onEdit}>
            <Text style={styles.editButton}>{t('petsNewScreen.edit')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlers.onDelete}>
            <Text style={styles.deleteButton}>
              {t('petsNewScreen.delete')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingTop: 20,
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: Color.black[200],
  },
  editButton: {
    ...LabelStyle.body({ color: Color.black[500] }),
    borderBottomWidth: 1,
    borderBottomColor: Color.black[500],
  },
  deleteButton: {
    ...LabelStyle.body({ color: Color.red[700]}),
    borderBottomWidth: 1,
    borderBottomColor: Color.red[700],
  },
})

export { PetDetail }
