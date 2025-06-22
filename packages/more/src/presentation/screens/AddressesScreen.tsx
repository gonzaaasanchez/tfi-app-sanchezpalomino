import React, { FC } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
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
} from '@packages/common'
import { useAddressesViewModel } from '../viewModels/AddressesViewModel'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Address } from '@packages/common'

const AddressesScreen: FC = (): JSX.Element => {
  const { t } = useI18n()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { state } = useAddressesViewModel()

  const AddressCard: FC<{ address: Address; onPress: () => void }> = ({
    address,
    onPress,
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <View style={styles.cardContainer}>
          <View style={styles.rightContainer}>
            <Text style={styles.petName}>{address.name}</Text>
            <View style={styles.row}>
              <PPMaterialIcon icon="location-on" size={16} />
              <Text style={styles.detail}>{address?.fullAddress}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.content}>
        {state.addresses.length > 0 ? (
          <FlatList
            data={state.addresses}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <AddressCard address={item} onPress={() => {}} />
            )}
            keyExtractor={(item, index) => item.name + index}
            contentContainerStyle={styles.addressList}
          />
        ) : (
          <EmptyView
            type="empty"
            title={t('addressesScreen.emptyState.title')}
            subtitle={t('addressesScreen.emptyState.subtitle')}
          />
        )}
      </View>
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
    </SafeAreaView>
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
