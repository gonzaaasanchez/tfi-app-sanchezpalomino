import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ServicesScreen } from './screens/ServicesScreen'
import { GeneralStyle, useI18n } from '@packages/common'
import { useNavigation } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const ServicesStack: FC = (): JSX.Element => {
  const { t } = useI18n()
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      id={navigation.getParent()}
      screenOptions={GeneralStyle.header}
    >
      <Stack.Screen
        name="servicesStack"
        component={ServicesScreen}
        options={{ headerTitle: t('servicesScreen.title') }}
      />
    </Stack.Navigator>
  )
}

export { ServicesStack }
