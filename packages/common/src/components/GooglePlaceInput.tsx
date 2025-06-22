import React, { FC, useRef } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Constants from 'expo-constants'
import { Color, StateColor } from '../style/Color'
import { LabelStyle } from '../style/Styles'
import { useI18n } from '../domain/hooks/i18n'
import { Address } from '../data/models/Address'

type GooglePlacesInputProps = {
  onPress: () => void
  onSelection?: (location: Address) => void
  placeholder?: string
  readonly?: boolean
}

const GooglePlacesInput: FC<GooglePlacesInputProps> = ({
  onPress,
  onSelection,
  readonly = false,
  placeholder,
}) => {
  const { t } = useI18n()
  const googlePlaceAutoCompleteRef = useRef(null)
  const googlePlaceskey = Constants.expoConfig?.extra?.googlePlacesApiKey ?? ''

  const isApiKeyValid = googlePlaceskey !== 'GOOGLE_PLACES_API_KEY'

  return (
    <View style={styles.container}>
      {Platform.OS == 'android' && !readonly && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.clearButton}
          onPress={() => googlePlaceAutoCompleteRef.current?.setAddressText('')}
        >
          <Text style={{ ...LabelStyle.body(), ...styles.clearText }}>
            {t('general.delete')}
          </Text>
        </TouchableOpacity>
      )}
      <GooglePlacesAutocomplete
        ref={googlePlaceAutoCompleteRef}
        fetchDetails={true}
        placeholder={
          isApiKeyValid ? placeholder : t('general.googlePlacesApiKeyMissing')
        }
        debounce={300}
        enablePoweredByContainer={false}
        autoFillOnNotFound={false}
        predefinedPlaces={[]}
        onPress={(data, details = null) => {
          const location = details?.geometry?.location
          if (location && onSelection) {
            onSelection({
              fullAddress: details?.formatted_address || '',
              coords: { lat: location.lat, lon: location.lng },
            })
          }
        }}
        query={{
          key: googlePlaceskey,
          language: 'es',
          components: 'country:ar',
        }}
        onFail={(error: any) => {
          console.error('GooglePlacesInput - onFail:', error)
        }}
        styles={inputStyles}
        textInputProps={{
          onPress: onPress,
        }}
        listEmptyComponent={
          <View style={styles.emptyComponent}>
            <Text style={styles.emptyText}>No se encontraron resultados</Text>
          </View>
        }
        listViewDisplayed={true}
        enableHighAccuracyLocation={true}
        minLength={2}
        nearbyPlacesAPI="GooglePlacesSearch"
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]}
      />
    </View>
  )
}

const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 0,
    justifyContent: 'center',
  },
  textInputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    paddingVertical: 6,
    height: 48,
  },
  textInput: {
    height: '100%',
    ...LabelStyle.body(),
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 0,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.brand1[100],
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.brand1[200],
    marginTop: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  separator: {
    height: 1,
    backgroundColor: Color.brand1[100],
  },
  description: {
    ...LabelStyle.body(),
    color: Color.brand1[900],
  },
})

const styles = StyleSheet.create({
  container: {
    // zIndex: 1,
  },
  clearButton: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  clearText: {
    color: Color.brand1[600],
    marginRight: 5,
  },
  searchIcon: {
    marginLeft: 10,
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
  errorText: {
    ...LabelStyle.caption1({ color: StateColor.error.default }),
    marginTop: 8,
    textAlign: 'center',
  },
  emptyComponent: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    ...LabelStyle.body({ color: Color.brand1[600] }),
  },
})

export { GooglePlacesInput }
