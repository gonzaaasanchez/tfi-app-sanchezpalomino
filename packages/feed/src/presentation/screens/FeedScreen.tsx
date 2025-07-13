import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  Color,
  EmptyView,
  GeneralStyle,
  HomeTabsHeight,
  Loader,
  PaginatedScrollView,
  PPMaterialIcon,
  Types,
  useI18n,
  useInjection,
} from '@packages/common'
import { FeedItem } from './FeedItem'
import { useFeedViewModel } from '../viewModels/FeedViewModel'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const FeedScreen: FC = (): JSX.Element => {
  const { state, loadFeed } = useFeedViewModel()
  const { t } = useI18n()
  const insets = useSafeAreaInsets()
  const baseUrl = useInjection(Types.BaseURL) as string

  return (
    <View style={styles.container}>
      <PaginatedScrollView
        contentContainerStyle={styles.scrollContainer}
        pagination={state.pagination}
        onLoadMore={() => loadFeed({ reset: false })}
        onRefresh={() => loadFeed({ reset: true })}
        renderItem={(item, index) => (
          <FeedItem key={index} item={item} baseUrl={baseUrl} />
        )}
        emptyComponent={
          <View style={styles.emptyViewContainer}>
            <EmptyView
              type="error"
              title={t('general.ups')}
              subtitle={t('feedScreen.noData')}
            />
          </View>
        }
      />
      <TouchableOpacity
        style={{
          ...GeneralStyle.addFloatingButton,
          bottom: HomeTabsHeight + insets.bottom + 20,
        }}
        onPress={() => {}}
      >
        <PPMaterialIcon icon="add" size={30} color={'white'} />
      </TouchableOpacity>
      {(state.loading || state.pagination.loading) && <Loader loading={true} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.mainBackground,
  },
  emptyViewContainer: {
    marginBottom: Number(GeneralStyle.addFloatingButton.height) + 20,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80 + 30, //tabbar aprox height + padding
    gap: 10,
  },
})

export { FeedScreen }
