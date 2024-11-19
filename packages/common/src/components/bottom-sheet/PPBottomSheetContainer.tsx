import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

type PPBottomSheetContainerProps = {
  children: React.ReactNode
}

const PPBottomSheetContainer: React.FC<PPBottomSheetContainerProps> = ({
  children,
}) => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export { PPBottomSheetContainer }
