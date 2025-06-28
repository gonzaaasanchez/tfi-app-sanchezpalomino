import {
  Button,
  Color,
  GenericToast,
  LabelStyle,
  Loader,
  PPMaterialIcon,
  useI18n,
  Dropdown,
  PetModel,
} from '@packages/common'
import React, { FC, useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useReserveNewViewModel } from '../../viewModels/ReserveNewViewModel'
import Slider from '@react-native-community/slider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PlaceType } from '../../../data/models/ReservationModel'

const ReservationNewScreen: FC = (): JSX.Element => {
  const {
    state,
    setFromDate,
    setToDate,
    setPlaceType,
    setReviewsFrom,
    setMaxDistance,
    setMaxPrice,
    setVisitsPerDay,
    setSelectedPets,
    setSelectedAddress,
    searchResults,
  } = useReserveNewViewModel()
  const { t } = useI18n()

  const DateSelection = () => {
    const dates = [
      {
        label: t('reserveNewScreen.dateFrom'),
        value: state.searchCriteria.fromDate,
        setDate: setFromDate,
      },
      {
        label: t('reserveNewScreen.dateTo'),
        value: state.searchCriteria.toDate,
        setDate: setToDate,
      },
    ]

    return (
      <View style={styles.datePickersContainer}>
        {dates.map(({ label, value, setDate }, index) => (
          <View key={index}>
            <Text style={styles.sectionTitle}>{label}</Text>
            <View style={styles.fieldContainer}>
              <DateTimePicker
                value={value || new Date()}
                minimumDate={new Date()}
                mode="date"
                display="default"
                onChange={(_, date) => date && setDate(date)}
                style={{ width: '100%', paddingRight: 5 }} // si el day tiene 1 solo digito, darle mas paddingRight
              />
            </View>
          </View>
        ))}
      </View>
    )
  }

  const PlaceSelection = () => {
    const options = [
      { label: t('reserveNewScreen.ownerHome'), value: PlaceType.OwnerHome },
      { label: t('reserveNewScreen.carerHome'), value: PlaceType.CarerHome },
    ]

    return (
      <View>
        <Text style={styles.sectionTitle}>{t('reserveNewScreen.place')}</Text>
        <View style={styles.radioGroup}>
          {options.map(({ label, value }) => (
            <TouchableOpacity
              key={value}
              style={styles.radioOption}
              onPress={() => setPlaceType(value)}
            >
              <View
                style={[
                  styles.radioCircle,
                  state.searchCriteria.placeType === value &&
                    styles.radioSelected,
                ]}
              />
              <Text style={LabelStyle.body({ fontWeight: 300 })}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  const PetSelection = () => {
    const handlePetChange = (items: { value: string; label: string }[]) => {
      const selectedPets = items
        .map((item) =>
          state.searchCriteria.userPets.find((pet) => pet.id === item.value)
        )
        .filter((pet): pet is PetModel => pet !== undefined)
      setSelectedPets(selectedPets)
    }

    return (
      <View>
        <Text style={styles.sectionTitle}>{t('reserveNewScreen.pets')}</Text>
        <Dropdown
          allowsMultiSelection={true}
          placeholder={t('reserveNewScreen.selectPets')}
          onFinishSelection={handlePetChange}
          data={state.searchCriteria.userPets.map((pet) => ({
            value: pet.id || '',
            label: pet.name || '',
          }))}
          initialValue={state.searchCriteria.selectedPets.map((pet) => ({
            value: pet.id || '',
            label: pet.name || '',
          }))}
        />
      </View>
    )
  }

  const LocationSelection = () => {
    const handleAddressChange = (
      items:
        | { value: string; label: string }[]
        | { value: string; label: string }
    ) => {
      // Manejar tanto arrays como objetos individuales
      const selectedItems = Array.isArray(items) ? items : [items]

      if (selectedItems.length > 0) {
        const selectedAddress = state.searchCriteria.userAddresses.find(
          (address) => address._id === selectedItems[0].value
        )
        setSelectedAddress(selectedAddress || null)
      } else {
        setSelectedAddress(null)
      }
    }

    // Crear el initialValue de forma que siempre tenga una nueva referencia
    const initialValue = state.searchCriteria.selectedAddress
      ? {
          value: state.searchCriteria.selectedAddress._id,
          label: state.searchCriteria.selectedAddress.name,
        }
      : undefined

    return (
      <View>
        <Text style={styles.sectionTitle}>{t('reserveNewScreen.address')}</Text>
        <Dropdown
          allowsMultiSelection={false}
          placeholder={t('reserveNewScreen.selectAddress')}
          onFinishSelection={handleAddressChange}
          data={state.searchCriteria.userAddresses.map((address) => ({
            value: address._id,
            label: address.name,
          }))}
          initialValue={initialValue}
        />
      </View>
    )
  }

  const RateSelection = () => {
    const stars = [1, 2, 3, 4, 5]
    return (
      <View>
        <Text style={styles.sectionTitle}>
          {t('reserveNewScreen.rateFrom')}
        </Text>
        <View style={styles.starContainer}>
          {stars.map((star) => (
            <TouchableOpacity key={star} onPress={() => setReviewsFrom(star)}>
              {state.searchCriteria.reviewsFrom >= star ? (
                <PPMaterialIcon
                  icon="star"
                  size={28}
                  color={Color.brand1[600]}
                />
              ) : (
                <PPMaterialIcon
                  icon="star-border"
                  size={28}
                  color={Color.brand1[600]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  const SliderSelection: FC<{
    labelKey: string
    unitKey: string
    minValue: number
    maxValue: number
    step: number
    value: number
    onValueChange: (value: number) => void
    onSlidingComplete: (value: number) => void
  }> = ({
    labelKey,
    unitKey,
    minValue,
    maxValue,
    step,
    value,
    onValueChange,
    onSlidingComplete,
  }) => {
    return (
      <View>
        <Text style={styles.sectionTitle}>{t(labelKey)}</Text>
        <Slider
          minimumValue={minValue}
          maximumValue={maxValue}
          step={step}
          tapToSeek
          minimumTrackTintColor={Color.brand1[600]}
          maximumTrackTintColor={Color.brand1[100]}
          value={value}
          onValueChange={onValueChange}
          onSlidingComplete={onSlidingComplete}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={LabelStyle.callout2()}>
            {t(unitKey, { value: minValue.toString() })}
          </Text>
          <Text style={LabelStyle.callout2()}>
            {t(unitKey, { value: value.toString() })}
          </Text>
        </View>
      </View>
    )
  }

  const DistanceSelection = () => {
    const [sliderValue, setSliderValue] = useState(
      state.searchCriteria.maxDistance
    )

    useEffect(() => {
      setSliderValue(state.searchCriteria.maxDistance)
    }, [state.searchCriteria.maxDistance])

    const handleValueChange = (value: number) => {
      setSliderValue(value)
    }

    const handleSlidingComplete = (value: number) => {
      setMaxDistance(value)
    }

    return (
      <SliderSelection
        labelKey="reserveNewScreen.distance"
        unitKey="reserveNewScreen.kms"
        minValue={0}
        maxValue={10}
        step={0.5}
        value={sliderValue}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    )
  }

  const PriceSelection = () => {
    const [sliderValue, setSliderValue] = useState(
      state.searchCriteria.maxPrice
    )

    useEffect(() => {
      setSliderValue(state.searchCriteria.maxPrice)
    }, [state.searchCriteria.maxPrice])

    const handleValueChange = (value: number) => {
      setSliderValue(value)
    }

    const handleSlidingComplete = (value: number) => {
      setMaxPrice(value)
    }

    return (
      <SliderSelection
        labelKey="reserveNewScreen.maxPrice"
        unitKey="reserveNewScreen.price"
        minValue={0}
        maxValue={100000}
        step={1}
        value={sliderValue}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    )
  }

  const VisitsPerDay = () => {
    const [inputVisits, setInputVisits] = useState(
      state.searchCriteria.visits.toString()
    )

    useEffect(() => {
      setInputVisits(state.searchCriteria.visits.toString())
    }, [state.searchCriteria.visits])

    const handleChangeText = (text: string) => {
      if (/^\d*$/.test(text)) {
        setInputVisits(text)
      }
    }

    const handleBlur = () => {
      setVisitsPerDay(Number(inputVisits))
    }
    return (
      <View>
        <Text style={styles.sectionTitle}>
          {t('reserveNewScreen.visitsPerDay')}
        </Text>
        <TextInput
          style={{
            ...styles.fieldContainer,
            paddingVertical: 10,
            ...LabelStyle.body2(),
          }}
          keyboardType="numeric"
          value={inputVisits}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {state.loading && <Loader loading={state.loading} />}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DateSelection />
        <PetSelection />
        <PlaceSelection />
        {state.searchCriteria.placeType === PlaceType.OwnerHome && (
          <VisitsPerDay />
        )}
        <LocationSelection />
        <DistanceSelection />

        <RateSelection />
        <PriceSelection />
      </ScrollView>
      <View style={{ paddingHorizontal: 20 }}>
        <Button.Primary
          title={t('reserveNewScreen.button')}
          onPress={searchResults}
        />
      </View>
      <GenericToast overrideOffset={5} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.mainBackground },
  scrollContainer: { padding: 20, gap: 30 },
  sectionTitle: { ...LabelStyle.title3({ fontWeight: 400 }) },
  datePickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 5,
    height: 48,
  },
  radioGroup: {
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 5,
  },
  radioOption: { flexDirection: 'row', alignItems: 'center' },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.brand1[600],
    marginRight: 10,
  },
  radioSelected: { backgroundColor: Color.brand1[600] },
  starContainer: { flexDirection: 'row', marginTop: 5 },
  starIcon: { width: 24, height: 24, marginRight: 5 },
})

export { ReservationNewScreen }
