import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
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
  EmptyView,
  Loader,
  useI18n,
  ImageWithPlaceholder,
  useInjection,
  getImageFullUrl,
  Types,
  GenericToast,
  PaginatedScrollView,
} from '@packages/common'
import { useNavigation, StackActions } from '@react-navigation/native'
import { usePetsViewModel } from '../viewModels/PetsViewModel'

const PetCard: FC<{ pet: PetModel; onPress: () => void; baseUrl: string }> = ({
  pet,
  onPress,
  baseUrl,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <ImageWithPlaceholder
            source={getImageFullUrl(pet.avatar, baseUrl)}
            dimension={60}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.petName}>{pet.name}</Text>
          <View style={styles.row}>
            <PPMaterialIcon icon="paw" size={16} />
            <Text style={styles.detail}>{pet.petType?.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const PetsScreen: FC = (): JSX.Element => {
  const [petDetail, setPetDetail] = useState<PetModel | null>(null)
  const [petToDelete, setPetToDelete] = useState<PetModel | null>(null)
  const petDetailModalRef = useBottomSheetModalRef()
  const deleteConfirmationModalRef = useBottomSheetModalRef()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { state, loadPets, deletePet } = usePetsViewModel()
  const { t } = useI18n()
  const baseUrl = useInjection(Types.BaseURL) as string

  useEffect(() => {
    if (petDetail) {
      petDetailModalRef.current?.present()
    }
  }, [petDetail])

  useEffect(() => {
    if (petToDelete) {
      deleteConfirmationModalRef.current?.present()
    }
  }, [petToDelete])

  useEffect(() => {
    if (state.petUpdated) {
      petDetailModalRef.current?.dismiss()
    }
  }, [state.petUpdated])

  const handleDeletePet = () => {
    deleteConfirmationModalRef.current?.dismiss()
    if (petToDelete?.id) {
      deletePet(petToDelete.id)
    }
    setPetToDelete(null)
  }

  const handleCancelDelete = () => {
    deleteConfirmationModalRef.current?.dismiss()
    setPetToDelete(null)
  }

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <PaginatedScrollView
          pagination={state.pagination}
          onLoadMore={() => loadPets({ reset: false })}
          onRefresh={() => loadPets({ reset: true })}
          contentContainerStyle={styles.scrollContainer}
          renderItem={(pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onPress={() => setPetDetail(pet)}
              baseUrl={baseUrl}
            />
          )}
          emptyComponent={
            <EmptyView
              type="empty"
              title={t('petsScreen.emptyState.title')}
              subtitle={t('petsScreen.emptyState.subtitle')}
            />
          }
        />
      </SafeAreaView>
      <PPBottomSheet.Empty
        ref={petDetailModalRef}
        dismisseable={true}
        onDismiss={() => setPetDetail(null)}
      >
        <PetDetail
          pet={petDetail}
          baseUrl={baseUrl}
          handlers={{
            onEdit: () => {
              petDetailModalRef.current?.dismiss()
              navigation.dispatch(
                StackActions.push('petsNew', { pet: petDetail })
              )
            },
            onDelete: () => {
              setPetToDelete(petDetail)
            },
          }}
        />
      </PPBottomSheet.Empty>
      <PPBottomSheet.Dialog
        ref={deleteConfirmationModalRef}
        title={t('petsNewScreen.confirmation.deleteTitle')}
        subtitle={t('petsNewScreen.confirmation.deleteSubtitle')}
        primaryActionTitle={t('petsNewScreen.confirmation.delete')}
        secondaryActionTitle={t('petsNewScreen.confirmation.cancel')}
        onPrimaryAction={handleDeletePet}
        onSecondaryAction={handleCancelDelete}
      />
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
      {state.loading || (state.pagination.loading && <Loader loading={true} />)}
      <GenericToast overrideOffset={10} />
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
    flexGrow: 1,
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
