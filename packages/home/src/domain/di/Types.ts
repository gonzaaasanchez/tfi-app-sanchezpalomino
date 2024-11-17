import { Types } from '@app/common'

const $ = {
  ...Types,
  HomeApi: Symbol.for('HomeApi'),
  HomeRepository: Symbol.for('HomeRepository'),
}

export { $ }
