import React from 'react'
import {
  ScrollView,
  ScrollViewProps,
  View,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import { PaginationModel } from '../data/models/PaginationModel'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Color } from '../style/Color'

type PaginationScrollState<T> = {
  items: T[]
  pagination: PaginationModel
  loading: boolean
  loadingMore: boolean
}

type PaginatedScrollViewProps<T> = ScrollViewProps & {
  pagination: PaginationScrollState<T>
  onLoadMore: () => void
  renderItem: (item: T, index: number) => React.ReactElement
  onScroll?: (event: any) => void
  onRefresh?: () => void
  threshold?: number
  emptyComponent?: React.ReactElement
  ListHeaderComponent?: React.ReactElement
}

export const PaginatedScrollView = <T,>({
  pagination,
  onLoadMore,
  renderItem,
  onScroll,
  threshold = 20,
  emptyComponent,
  onRefresh,
  ListHeaderComponent,
  ...scrollViewProps
}: PaginatedScrollViewProps<T>) => {
  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - threshold

    const hasMorePages =
      pagination.pagination.page < pagination.pagination.totalPages

    if (isCloseToBottom && hasMorePages && !pagination.loadingMore) {
      onLoadMore()
    }

    onScroll?.(event)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        {...scrollViewProps}
        onScroll={handleScroll}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={pagination.loading && pagination.items.length === 0}
              onRefresh={onRefresh}
              tintColor={Color.brand1[100]}
            />
          ) : undefined
        }
        contentContainerStyle={[
          scrollViewProps.contentContainerStyle,
          pagination.items.length === 0 &&
            !pagination.loading &&
            styles.emptyContainer,
        ]}
      >
        {ListHeaderComponent}
        {pagination.items.length > 0 &&
          pagination.items.map((item, index) => renderItem(item, index))}
        {pagination.items.length === 0 && !pagination.loading && emptyComponent}
      </ScrollView>
      {pagination.loadingMore && (
        <View style={styles.loaderContent}>
          <SafeAreaView edges={['bottom']}>
            <ActivityIndicator size="small" color={Color.brand1[800]} />
          </SafeAreaView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  loaderContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
