import React, { FC, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Color,
  useI18n,
  EmptyView,
  GeneralStyle,
  PPMaterialIcon,
  Loader,
  LabelStyle,
  AddressModel,
  useBottomSheetModalRef,
  PPBottomSheet,
  PPBottomSheetContainer,
  AddressDetail,
  GenericToast,
} from '@packages/common'
import { useAddressesViewModel } from '../viewModels/AddressesViewModel'
import { StackActions, useNavigation } from '@react-navigation/native'

const AddressesScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { state, loadAddresses, deleteAddress } = useAddressesViewModel()
  const [refreshing, setRefreshing] = useState(false)
  const [addressDetail, setAddressDetail] = useState<AddressModel | null>(null)
  const [addressToDelete, setAddressToDelete] = useState<AddressModel | null>(
    null
  )
  const addressDetailModalRef = useBottomSheetModalRef()
  const deleteConfirmationModalRef = useBottomSheetModalRef()

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await loadAddresses()
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (addressDetail) {
      addressDetailModalRef.current?.present()
    }
  }, [addressDetail])

  useEffect(() => {
    if (addressToDelete) {
      deleteConfirmationModalRef.current?.present()
    }
  }, [addressToDelete])

  useEffect(() => {
    if (state.addressDeleted) {
      addressDetailModalRef.current?.dismiss()
      onRefresh()
    }
  }, [state.addressDeleted])

  const handleDeleteAddress = () => {
    deleteConfirmationModalRef.current?.dismiss()
    if (addressToDelete?._id) {
      deleteAddress(addressToDelete._id)
    }
    setAddressToDelete(null)
  }

  const handleCancelDeleteAddress = () => {
    deleteConfirmationModalRef.current?.dismiss()
    setAddressToDelete(null)
  }

  const AddressCard: FC<{ address: AddressModel; onPress: () => void }> = ({
    address,
    onPress,
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <View style={styles.cardContainer}>
          <View style={styles.rightContainer}>
            <Text style={styles.petName}>{address.name}</Text>
            <View style={styles.row}>
              <PPMaterialIcon icon="home-filled" size={16} />
              <Text style={styles.detail}>{address?.fullAddress}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <PPBottomSheetContainer>
      <SafeAreaView style={styles.container} edges={[]}>
        <View style={styles.content}>
          {!state.loading && state.addresses.length === 0 && (
            <EmptyView
              type="empty"
              title={t('addressesScreen.emptyState.title')}
              subtitle={t('addressesScreen.emptyState.subtitle')}
            />
          )}
          {state.addresses.length > 0 && (
            <FlatList
              data={state.addresses}
              showsVerticalScrollIndicator
              renderItem={({ item }) => (
                <AddressCard
                  address={item}
                  onPress={() => setAddressDetail(item)}
                />
              )}
              keyExtractor={(item, index) => item.name + index}
              contentContainerStyle={styles.addressList}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={Color.brand1[100]}
                />
              }
            />
          )}
        </View>
        <PPBottomSheet.Empty
          ref={addressDetailModalRef}
          dismisseable={true}
          onDismiss={() => setAddressDetail(null)}
        >
          <AddressDetail
            address={addressDetail}
            handlers={{
              onEdit: () => {
                addressDetailModalRef.current?.dismiss()
                navigation.dispatch(
                  StackActions.push('addressNew', { address: addressDetail })
                )
              },
              onDelete: () => {
                setAddressToDelete(addressDetail)
              },
            }}
          />
        </PPBottomSheet.Empty>
        <PPBottomSheet.Dialog
          ref={deleteConfirmationModalRef}
          title={t('addressesScreen.confirmation.deleteTitle')}
          subtitle={t('addressesScreen.confirmation.deleteSubtitle')}
          primaryActionTitle={t('addressesScreen.confirmation.delete')}
          secondaryActionTitle={t('addressesScreen.confirmation.cancel')}
          onPrimaryAction={handleDeleteAddress}
          onSecondaryAction={handleCancelDeleteAddress}
        />
        <TouchableOpacity
          style={{
            ...GeneralStyle.addFloatingButton,
            bottom: insets.bottom + 20,
          }}
          onPress={() => {
            navigation.dispatch(StackActions.push('addressNew'))
          }}
        >
          <PPMaterialIcon icon="add" size={30} color={'white'} />
        </TouchableOpacity>
        {state.loading && <Loader loading={state.loading} />}
        <GenericToast overrideOffset={10} />
      </SafeAreaView>
    </PPBottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  content: {
    flex: 1,
  },
  addressList: {
    flexGrow: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  cardContainer: {
    ...GeneralStyle.card,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
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
    ...LabelStyle.body({ fontWeight: 600, color: Color.brand1[700] }),
    marginBottom: 4,
  },
  detail: {
    ...LabelStyle.callout2({ color: Color.black[500] }),
    marginLeft: 6,
    flexShrink: 1,
  },
})

export { AddressesScreen }
