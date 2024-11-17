import { StackActions, useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MoreScreen: FC = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text>{'More Screen'}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.dispatch(StackActions.push('profile'))}
        testID="moreScreen.profile"
      >
        <Text style={styles.buttonText}>{'Go to Profile'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 48,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export { MoreScreen }
