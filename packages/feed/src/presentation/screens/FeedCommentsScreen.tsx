import React, { FC, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import {
  Color,
  EmptyView,
  GeneralStyle,
  GenericToast,
  Loader,
  PaginatedScrollView,
  useI18n,
  LabelStyle,
  DateUtils,
  ImageWithPlaceholder,
  getImageFullUrl,
} from '@packages/common'
import { useFeedCommentsViewModel } from '../viewModels/FeedCommentsViewModel'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute, RouteProp } from '@react-navigation/native'
import { CommentModel } from '@packages/common'
import { MaterialIcons } from '@expo/vector-icons'

type FeedCommentsScreenProps = {
  feedComments: {
    postId: string
  }
}

const FeedCommentsScreen: FC = (): JSX.Element => {
  const route = useRoute<RouteProp<FeedCommentsScreenProps, 'feedComments'>>()
  const { postId } = route.params
  const { state, loadComments, setCommentText, createComment, baseUrl } =
    useFeedCommentsViewModel(postId)
  const { t } = useI18n()
  const insets = useSafeAreaInsets()
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [isKeyboardWillShow, setIsKeyboardWillShow] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true)
        setIsKeyboardWillShow(false)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (Platform.OS === 'android') {
          setTimeout(() => {
            setIsKeyboardVisible(false)
            setIsKeyboardWillShow(false)
          }, 100)
        } else {
          setIsKeyboardVisible(false)
          setIsKeyboardWillShow(false)
        }
      }
    )

    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setIsKeyboardWillShow(true)
      }
    )
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setIsKeyboardWillShow(false)
        if (Platform.OS === 'ios') {
          setIsKeyboardVisible(false)
        }
      }
    )

    return () => {
      keyboardDidShowListener?.remove()
      keyboardDidHideListener?.remove()
      keyboardWillShowListener?.remove()
      keyboardWillHideListener?.remove()
    }
  }, [])

  const renderComment = (comment: CommentModel, index: number) => {
    const fullName = `${comment.author.firstName} ${comment.author.lastName}`

    const getAvatarUrl = (): string | null => {
      const avatarUrl = getImageFullUrl(comment.author.avatar, baseUrl)
      if (!avatarUrl) return null
      // Agregar timestamp para evitar cache
      return `${avatarUrl}?_t=${Date.now()}`
    }

    return (
      <View key={index} style={styles.commentCard}>
        <View style={styles.commentHeader}>
          <View style={styles.authorInfo}>
            <ImageWithPlaceholder source={getAvatarUrl()} dimension={35} />
          </View>
          <View>
          <Text style={styles.authorName}>{fullName}</Text>
            <Text style={styles.commentDate}>
              {DateUtils.DDMMYYYY(comment.createdAt)}
            </Text>
          </View>
        </View>
        <Text style={styles.commentText}>{comment.comment}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <PaginatedScrollView
        contentContainerStyle={{
          ...styles.scrollContainer,
          paddingBottom: 20,
        }}
        pagination={state.pagination}
        onLoadMore={() => loadComments({ reset: false })}
        onRefresh={() => loadComments({ reset: true })}
        renderItem={renderComment}
        emptyComponent={
          <View style={styles.emptyViewContainer}>
            <EmptyView
              type="empty"
              title={t('feedCommentsScreen.emptyTitle')}
              subtitle={t('feedCommentsScreen.emptySubtitle')}
            />
          </View>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View
          style={[
            styles.inputContainer,
            {
              paddingBottom:
                insets.bottom +
                10 +
                (isKeyboardWillShow || isKeyboardVisible ? 70 : 0),
            },
          ]}
        >
          <TextInput
            style={styles.textInput}
            placeholder={t('feedCommentsScreen.placeholder')}
            placeholderTextColor={Color.black[400]}
            value={state.commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { opacity: state.commentText.trim() ? 1 : 0.5 },
            ]}
            onPress={() => {
              createComment()
              Keyboard.dismiss()
            }}
            disabled={!state.commentText.trim() || state.loading}
          >
            <MaterialIcons
              name="send"
              size={20}
              color={
                state.commentText.trim() ? Color.brand1[600] : Color.black[400]
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {(state.loading || state.pagination.loading) && <Loader loading={true} />}
      <GenericToast overrideOffset={10} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  scrollContainer: {
    padding: 20,
    gap: 15,
  },
  emptyViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentCard: {
    ...GeneralStyle.card,
    padding: 15,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorName: {
    ...LabelStyle.callout2({ color: Color.black[600] }),
    fontWeight: '600',
  },
  commentDate: {
    ...LabelStyle.caption1({ color: Color.black[400] }),
  },
  commentText: {
    ...LabelStyle.callout2({ color: Color.black[700] }),
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: Color.brand1[50],
    borderTopWidth: 1,
    borderTopColor: Color.brand1[200],
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: Color.black[50],
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    minHeight: 40,
    ...LabelStyle.callout2({ color: Color.black[700] }),
    borderWidth: 1,
    borderColor: Color.black[200],
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.black[50],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.black[200],
  },
})

export { FeedCommentsScreen }
