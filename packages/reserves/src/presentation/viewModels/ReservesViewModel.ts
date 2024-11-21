import { UIState } from '@packages/common'
import { useState } from 'react'
import { ReserveStatus, ReserveType } from '../../data/models/local/Types'

const reservations = [
  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'John',
    lastName: 'Doe',
    date: '2024-11-21',
    address: '123 Main St, City, Country',
  },
  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'Jane',
    lastName: 'Smith',
    date: '2024-11-22',
    address: '456 Another St, City, Country',
  },
  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'John',
    lastName: 'Doe',
    date: '2024-11-21',
    address: '123 Main St, City, Country',
  },
  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'Jane',
    lastName: 'Smith',
    date: '2024-11-22',
    address: '456 Another St, City, Country',
  },

  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'John',
    lastName: 'Doe',
    date: '2024-11-21',
    address: '123 Main St, City, Country',
  },
  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'Jane',
    lastName: 'Smith',
    date: '2024-11-22',
    address: '456 Another St, City, Country',
  },
  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'Jane',
    lastName: 'Smith',
    date: '2024-11-22',
    address: '456 Another St, City, Country',
  },

  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'John',
    lastName: 'Doe',
    date: '2024-11-21',
    address: '123 Main St, City, Country',
  },
  {
    photoUrl:
      'https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png',
    firstName: 'Jane',
    lastName: 'Smith',
    date: '2024-11-22',
    address: '456 Another St, City, Country',
  },
]

type ReservesViewModel = {
  state: ReservesState
  setReserveType: (type: ReserveType) => void
  setReserveStatus: (status: ReserveStatus) => void
  getReserves: () => Promise<void>
}

type ReservesState = {
  selectedType: ReserveType
  selectedStatus: ReserveStatus
  reserves: any[]
} & UIState

const initialState: ReservesState = {
  loading: false,
  error: null,
  selectedType: 'sent',
  selectedStatus: 'confirmed',
  reserves: [],
}

const useReservesViewModel = (): ReservesViewModel => {
  const [state, setState] = useState<ReservesState>(initialState)

  const setReserveType: (status: ReserveType) => void = async (type) => {
    setState((previous) => ({
      ...previous,
      selectedType: type,
    }))
    getReserves()
  }

  const setReserveStatus: (status: ReserveStatus) => void = async (status) => {
    setState((previous) => ({
      ...previous,
      selectedStatus: status,
    }))
    getReserves()
  }

  const getReserves = async (): Promise<void> => {
    const delay = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms))

    setState((previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      //   const user = await useCase.execute(state.email, state.password)
      await delay(1500)

      setState((previous) => ({
        ...previous,
        loading: false,
        error: null,
        reserves: reservations,
      }))
    } catch (error) {
      setState((previous) => ({
        ...previous,
        loading: false,
        error: error.message,
      }))
    }
  }

  return { state, setReserveType, setReserveStatus, getReserves }
}

export { useReservesViewModel }
