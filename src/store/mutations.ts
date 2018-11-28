import { INVENTORY } from './state'

export const SET_INVENTORY = 'SET_INVENTORY'
export const MARK_DEVICE_BOOKED = 'MARK_DEVICE_BOOKED'
export const MARK_DEVICE_RETURNED = 'MARK_DEVICE_RETURNED'

export default {
  [SET_INVENTORY](state, inventory) {
    state[INVENTORY] = inventory
  },
  [MARK_DEVICE_BOOKED](state, { deviceName, bookedBy, bookedAt }) {
    const device = state[INVENTORY].find(i => i.device.name === deviceName)
    device.bookedBy = bookedBy
    device.bookedAt = bookedAt
  },
  [MARK_DEVICE_RETURNED](state, { deviceName, bookedBy, bookedAt }) {
    const device = state[INVENTORY].find(i => i.device.name === deviceName)
    device.bookedBy = null
    device.bookedAt = null
  },
}
