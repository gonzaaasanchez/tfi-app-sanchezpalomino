import React, { FC, useEffect } from 'react'
import {
  Color,
  LabelStyle,
  useI18n,
  GeneralStyle,
  Button,
  ButtonState,
  ImageWithPlaceholder,
  useBottomSheetModalRef,
  PPBottomSheet,
  ImagePickerOptions,
  GenericToast,
  Loader,
  PPBottomSheetContainer,
} from '@packages/common'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useFeedNewViewModel } from '../viewModels/FeedNewViewModel'

type FeedNewScreenProps = {
  onCreatePost?: (image: string, title: string, description: string) => void
}

const FeedNewScreen: FC<FeedNewScreenProps> = ({ onCreatePost }) => {
  const { t } = useI18n()
  const {
    state,
    setTitle,
    setDescription,
    selectImageFrom,
    validateForm,
    savePost,
  } = useFeedNewViewModel()

  const imagePickerModalRef = useBottomSheetModalRef()

  const handleImageSelection = (source: 'camera' | 'gallery') => {
    imagePickerModalRef.current?.dismiss()
    selectImageFrom(source)
  }

  const Avatar = () => {
    let avatarSource = state.avatarFile

    return (
      <View style={styles.avatarContainer}>
        <ImageWithPlaceholder source={avatarSource} dimension={140} />
        <TouchableOpacity
          style={styles.uploadButton}
          activeOpacity={0.85}
          onPress={() => imagePickerModalRef.current?.present()}
        >
          <Text style={styles.uploadText}>{t('feedNewScreen.addImage')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <PPBottomSheetContainer>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
          indicatorStyle="black"
          scrollIndicatorInsets={{ right: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ gap: 20 }}>
              <Text style={styles.title}>{t('feedNewScreen.title')}</Text>
              <Avatar />
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  {t('feedNewScreen.titleLabel')}
                </Text>
                <TextInput
                  style={styles.titleInput}
                  placeholder={t('feedNewScreen.titlePlaceholder')}
                  value={state.title || ''}
                  onChangeText={setTitle}
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  {t('feedNewScreen.commentLabel')}
                </Text>
                <TextInput
                  style={styles.commentInput}
                  placeholder={t('feedNewScreen.commentPlaceholder')}
                  value={state.description || ''}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
              <View style={styles.actionsContainer}>
                <Button.Primary
                  title={t('feedNewScreen.createPost')}
                  onPress={() => validateForm(() => savePost())}
                  state={
                    !state.avatarFile ||
                    !state.title?.trim() ||
                    !state.description?.trim()
                      ? ButtonState.DISABLE
                      : ButtonState.ENABLE
                  }
                  loading={state.loading}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <GenericToast overrideOffset={10} />
          {state.loading && <Loader loading={state.loading} />}

          <PPBottomSheet.Empty ref={imagePickerModalRef} dismisseable={true}>
            <ImagePickerOptions
              handleImageSelection={handleImageSelection}
              onDismiss={() => imagePickerModalRef.current?.dismiss()}
            />
          </PPBottomSheet.Empty>
        </ScrollView>
      </KeyboardAvoidingView>
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: Color.brand2[100],
  },

  title: {
    ...LabelStyle.title1({ textAlign: 'center' }),
    color: Color.black[800],
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Color.brand1[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.brand1[300],
  },
  uploadButton: {
    margin: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: Color.brand2[50],
    borderRadius: 20,
  },
  uploadText: {
    ...LabelStyle.body2({ fontWeight: 600, color: Color.black[600] }),
  },
  fieldContainer: {
    gap: 5,
  },
  fieldLabel: {
    ...LabelStyle.body({ fontWeight: 500 }),
    color: Color.black[700],
  },
  titleInput: {
    ...GeneralStyle.card,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    padding: 12,
    minHeight: 25,
    textAlignVertical: 'top',
    ...LabelStyle.body(),
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

export { FeedNewScreen }
