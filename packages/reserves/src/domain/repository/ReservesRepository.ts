import { ReserveType, ReserveStatus } from '../../data/models/local/Types'
import { ReservationModel } from '../../data/models/ReservationModel'

interface ReservesRepository {
  getReserves(
    type: ReserveType,
    status: ReserveStatus
  ): Promise<ReservationModel[]>
}

export default ReservesRepository
