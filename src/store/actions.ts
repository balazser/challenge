import client from 'axios'
import { TOKEN, ENDPOINT_API } from '../constants/config'
import {
  SET_INVENTORY,
  MARK_DEVICE_BOOKED,
  MARK_DEVICE_RETURNED,
} from './mutations'

export const FETCH_INVENTORY = 'FETCH_PEOPLE'
export const BOOK_DEVICE = 'BOOK_DEVICE'
export const RETURN_DEVICE = 'RETURN_DEVICE'

export default {
  async [FETCH_INVENTORY]({ commit }) {
    const { data } = await client.get(`${ENDPOINT_API}/inventory`)
    commit(SET_INVENTORY, data)
  },
  async [BOOK_DEVICE]({ commit }, { deviceName, bookedBy }) {
    const dto = { deviceName, bookedBy }
    const { data } = await client.post(`${ENDPOINT_API}/inventory`, dto)
    commit(MARK_DEVICE_BOOKED, data)
  },
  async [RETURN_DEVICE]({ commit }, deviceName) {
    const { data } = await client.delete(
      `${ENDPOINT_API}/inventory/${deviceName}`
    )
    commit(MARK_DEVICE_RETURNED, data)
  },
}
