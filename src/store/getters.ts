import { INVENTORY } from './state'

export const ALL_INVENTORY = 'ALL_INVENTORY'

export default {
  [ALL_INVENTORY](state) {
    return state[INVENTORY]
  },
}
