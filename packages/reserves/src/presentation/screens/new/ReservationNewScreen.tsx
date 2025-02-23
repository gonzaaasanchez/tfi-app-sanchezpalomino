import {
  Color,
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
  Image,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useReserveNewViewModel } from '../../viewModels/ReserveNewViewModel'
import { AnimationObject } from 'lottie-react-native'
import { PlaceType } from '@packages/reserves/src/data/models/ReservationModel'

const ReservationNewScreen: FC = (): JSX.Element => {
  const {
    state,
    setStartDate,
    setEndDate,
    setPlaceType,
    setReviewsFrom,
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
      if (state.error === 'MANAGE_ME') {
        showAlert(t('general.ups'), t('forgotPasswordScreen.error.message'))
      } else {
        ShowToast({
          config: 'error',
          title: t('general.ups'),
          subtitle: state.error,
        })
      }
    }
  }, [state.error])

  const DateSelection = () => {
    const dates = [
      {
        label: t('Fecha inicio'),
        value: state.fromDate,
        setDate: setStartDate,
      },
      { label: t('Fecha fin'), value: state.fromDate, setDate: setEndDate },
    ]

    return (
      <View style={styles.datePickersContainer}>
        {dates.map(({ label, value, setDate }, index) => (
          <View key={index}>
            <Text style={LabelStyle.title3({ fontWeight: 400 })}>{label}</Text>
            <View style={styles.datePicker}>
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
      { label: t('Domicilio del cuidador'), value: PlaceType.Home },
      { label: t('Mi domicilio'), value: PlaceType.Visit },
    ]

    return (
      <View>
        <Text style={LabelStyle.title3({ fontWeight: 400 })}>
          {t('Lugar de cuidado')}
        </Text>
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
        <Text style={LabelStyle.title3({ fontWeight: 400 })}>
          {t('Evaluaciones desde')}
        </Text>
        <View style={styles.starContainer}>
          {stars.map((star) => (
            <TouchableOpacity key={star} onPress={() => setReviewsFrom(star)}>
              {state.reviewsFrom >= star ? (
                <PPMaterialIcon icon="star" size={28} color={Color.brand1[600]} />
              ) : (
                <PPMaterialIcon icon="star-border" size={28} color={Color.brand1[600]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {state.loading && (
          <Loader loading={state.loading} opacity={0.85} animal="dog" />
        )}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <DateSelection />
          <PlaceSelection />
          <RateSelection />
        </ScrollView>
      </View>

      <PPBottomSheet.Dialog
        ref={bottomSheetModalRef}
        title={alertTitle}
        subtitle={alertSubtitle}
        lottieFile={alertAnimation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.mainBackground },
  scrollContainer: { padding: 20, gap: 25 },
  datePickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePicker: {
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
