import ReservesRepository from '../repository/ReservesRepository'
import { CreateReservationData } from '../../data/models/local/Types'
import { ReservationModel, PlaceType } from '../../data/models/ReservationModel'
import { useI18n } from '@packages/common'

class CreateReservationUseCase {
  private reservesRepository: ReservesRepository

  constructor(reservesRepository: ReservesRepository) {
    this.reservesRepository = reservesRepository
  }

  async execute(data: CreateReservationData): Promise<ReservationModel> {
    this.validateReservationData(data)
    return await this.reservesRepository.createReservation(data)
  }

  private validateReservationData(data: CreateReservationData): void {
    const { t } = useI18n()

    if (!data.startDate) {
      throw new Error(
        t('reserveNewScreen.validation.usecase.startDateRequired')
      )
    }

    if (!data.endDate) {
      throw new Error(t('reserveNewScreen.validation.usecase.endDateRequired'))
    }

    if (!data.caregiverId) {
      throw new Error(
        t('reserveNewScreen.validation.usecase.caregiverIdRequired')
      )
    }

    if (!data.petIds || data.petIds.length === 0) {
      throw new Error(t('reserveNewScreen.validation.usecase.petsRequired'))
    }

    if (data.distance < 0) {
      throw new Error(t('reserveNewScreen.validation.usecase.distanceNegative'))
    }

    const startDate = new Date(data.startDate)
    const endDate = new Date(data.endDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (startDate < today) {
      throw new Error(
        t('reserveNewScreen.validation.usecase.startDateBeforeToday')
      )
    }

    if (endDate < startDate) {
      throw new Error(
        t('reserveNewScreen.validation.usecase.endDateBeforeStartDate')
      )
    }

    if (data.careLocation === PlaceType.OwnerHome) {
      if (!data.userAddressId) {
        throw new Error(
          t('reserveNewScreen.validation.usecase.userAddressRequired')
        )
      }
      if (!data.visitsPerDay || data.visitsPerDay < 1) {
        throw new Error(
          t('reserveNewScreen.validation.usecase.visitsPerDayRequired')
        )
      }
    } else if (data.careLocation === PlaceType.CarerHome) {
      if (!data.caregiverAddressId) {
        throw new Error(
          t('reserveNewScreen.validation.usecase.caregiverAddressRequired')
        )
      }
    }
  }
}

export { CreateReservationUseCase }
