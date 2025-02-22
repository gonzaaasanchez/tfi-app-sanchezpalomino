import {
    Color,
    Loader,
    PPBottomSheet,
    ShowToast,
    useI18n,
  } from '@packages/common'
  import React, { FC, useEffect, useRef, useState } from 'react'
  import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
  // import DatePicker from 'react-native-date-picker'
  import { useReserveNewViewModel } from '../../viewModels/ReserveNewViewModel'
  import { AnimationObject } from 'lottie-react-native'
  
  const ReservationNewScreen: FC = (): JSX.Element => {
    const { state, createReserve } = useReserveNewViewModel()
    const bottomSheetModalRef = useRef(null)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertSubtitle, setAlertSubtitle] = useState('')
    const [alertAnimation, setAlertAnimation] = useState(null)
    const [fromDate, setFromDate] = useState<Date | null>(null)
    const [toDate, setToDate] = useState<Date | null>(null)
    const [openFrom, setOpenFrom] = useState(false)
    const [openTo, setOpenTo] = useState(false)
  
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
          ShowToast({ config: 'error', title: t('general.ups'), subtitle: state.error })
        }
      }
    }, [state.error])
  
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {state.loading && <Loader loading={state.loading} opacity={0.85} animal="dog" />}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity style={styles.dateButton} onPress={() => setOpenFrom(true)}>
              <Text style={styles.dateText}>
                {fromDate ? fromDate.toLocaleDateString() : t('Seleccionar fecha desde')}
              </Text>
            </TouchableOpacity>
  
            {/* <DatePicker
              modal
              open={openFrom}
              date={fromDate || new Date()}
              mode="date"
              onConfirm={(date) => {
                setOpenFrom(false)
                setFromDate(date)
              }}
              onCancel={() => setOpenFrom(false)}
            /> */}
  
            <TouchableOpacity style={styles.dateButton} onPress={() => setOpenTo(true)}>
              <Text style={styles.dateText}>
                {toDate ? toDate.toLocaleDateString() : t('Seleccionar fecha hasta')}
              </Text>
            </TouchableOpacity>
  
            {/* <DatePicker
              modal
              open={openTo}
              date={toDate || new Date()}
              mode="date"
              onConfirm={(date) => {
                setOpenTo(false)
                setToDate(date)
              }}
              onCancel={() => setOpenTo(false)}
            /> */}
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
    container: {
      flex: 1,
      backgroundColor: Color.mainBackground,
    },
    scrollContainer: {
      padding: 20,
      paddingBottom: 110, // Ajuste por tabbar y espacio extra
    },
    dateButton: {
      backgroundColor: Color.brand1[100],
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
    },
    dateText: {
      color: 'white',
      fontSize: 16,
    },
  })
  
  export { ReservationNewScreen }