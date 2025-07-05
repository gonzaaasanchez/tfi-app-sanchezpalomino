import React, { FC, useState } from 'react'
import {
  Color,
  LabelStyle,
  useI18n,
  GeneralStyle,
  PPMaterialIcon,
  Button,
  ButtonState,
} from '@packages/common'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'

type ReviewBottomSheetContentProps = {
  onReviewSubmitted: (rating: number, comment: string) => void
}

const ReviewBottomSheetContent: FC<ReviewBottomSheetContentProps> = ({
  onReviewSubmitted,
}) => {
  const { t } = useI18n()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const stars = [1, 2, 3, 4, 5]

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleSubmit = () => {
    if (rating === 0) {
      return
    }
    onReviewSubmitted(rating, comment)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('reserveDetailScreen.reviewsSection.createReview')}
      </Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>
          {t('reserveDetailScreen.reviewsSection.rating')}
        </Text>
        <View style={styles.starsContainer}>
          {stars.map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleStarPress(star)}
              style={styles.starButton}
            >
              <PPMaterialIcon
                icon={rating >= star ? 'star' : 'star-border'}
                size={32}
                color={rating >= star ? Color.brand1[600] : Color.brand1[400]}
              />
            </TouchableOpacity>
          ))}
        </View>
        {rating > 0 && (
          <Text style={styles.ratingText}>
            {t('reserveDetailScreen.reviewsSection.ratingSelected', {
              rating: rating.toString(),
            })}
          </Text>
        )}
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>
          {t('reserveDetailScreen.reviewsSection.comment')}
        </Text>
        <TextInput
          style={styles.commentInput}
          placeholder={t(
            'reserveDetailScreen.reviewsSection.commentPlaceholder'
          )}
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.actionsContainer}>
        <Button.Primary
          title={t('reserveDetailScreen.reviewsSection.submitReview')}
          onPress={handleSubmit}
          state={rating === 0 || comment.length === 0 ? ButtonState.DISABLE : ButtonState.ENABLE}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  title: {
    ...LabelStyle.title1({ textAlign: 'center' }),
    color: Color.black[800],
  },
  ratingContainer: {
    alignItems: 'center',
    gap: 5,
  },
  ratingLabel: {
    ...LabelStyle.body({ fontWeight: 500 }),
    color: Color.black[700],
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 0,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    ...LabelStyle.callout2(),
    color: Color.brand1[600],
  },
  commentContainer: {
    gap: 5,
  },
  commentLabel: {
    ...LabelStyle.body({ fontWeight: 500 }),
    color: Color.black[700],
  },
  commentInput: {
    ...GeneralStyle.card,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    padding: 12,
    minHeight: 120,
    textAlignVertical: 'top',
    ...LabelStyle.body(),
  },
  actionsContainer: {
    gap: 10,
  },
})

export { ReviewBottomSheetContent }
