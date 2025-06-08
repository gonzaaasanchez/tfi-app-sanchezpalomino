import {
  Button,
  Color,
  GenericToast,
  LabelStyle,
  Loader,
  PPBottomSheet,
  PPMaterialIcon,
  ShowToast,
  useI18n,
} from '@packages/common'
import React, { FC, useEffect, useRef, useState } from 'react'
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
import { AnimationObject } from 'lottie-react-native'
import { PlaceType } from '@packages/reserves/src/data/models/ReservationModel'
import Slider from '@react-native-community/slider'
import { SafeAreaView } from 'react-native-safe-area-context'

const ReservationNewScreen: FC = (): JSX.Element => {
  const {
    state,
    setStartDate,
    setEndDate,
    setPlaceType,
    setReviewsFrom,
    setMaxDistance,
    setMaxPrice,
    setVisitsPerDay,
    createReserve,
  } = useReserveNewViewModel()
  const bottomSheetModalRef = useRef(null)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertSubtitle, setAlertSubtitle] = useState('')
  const [alertAnimation, setAlertAnimation] = useState<AnimationObject | null>(
    null
  )
  const { t } = useI18n()

  const showAlert = (
    title: string,
    subtitle: string,
    animation?: AnimationObject | null
  ) => {
    setAlertTitle(title)
    setAlertSubtitle(subtitle)
    setAlertAnimation(animation)
    bottomSheetModalRef.current?.present()
  }

  useEffect(() => {
    if (state.error) {
      ShowToast({
        config: 'error',
        title: t('general.ups'),
        subtitle: state.error,
      })
    }
  }, [state.error])

  const DateSelection = () => {
    const dates = [
      {
        label: t('reserveNewScreen.dateFrom'),
        value: state.fromDate,
        setDate: setStartDate,
      },
      {
        label: t('reserveNewScreen.dateTo'),
        value: state.fromDate,
        setDate: setEndDate,
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
      { label: t('reserveNewScreen.placeHome'), value: PlaceType.Home },
      { label: t('reserveNewScreen.placeVisit'), value: PlaceType.Visit },
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
                  state.placeType === value && styles.radioSelected,
                ]}
              />
              <Text style={LabelStyle.body({ fontWeight: 300 })}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
              {state.reviewsFrom >= star ? (
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
    const [sliderValue, setSliderValue] = useState(state.maxDistance)

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
    const [sliderValue, setSliderValue] = useState(state.maxPrice)

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
    const [inputVisits, setInputVisits] = useState(state.visits.toString())
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
      {state.loading && (
        <Loader loading={state.loading} opacity={0.85} animal="dog" />
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DateSelection />
        <PlaceSelection />
        <RateSelection />
        <VisitsPerDay />
        <DistanceSelection />
        <PriceSelection />
      </ScrollView>
      <View style={{ paddingHorizontal: 20 }}>
        <Button.Primary
          title={t('reserveNewScreen.button')}
          onPress={createReserve}
        />
      </View>
      <PPBottomSheet.Dialog
        ref={bottomSheetModalRef}
        title={alertTitle}
        subtitle={alertSubtitle}
        lottieFile={alertAnimation}
      />
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
    backgroundColor: Color.mainBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.brand1[500],
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 5,
  },
  radioGroup: {
    // flexDirection: 'row',
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
