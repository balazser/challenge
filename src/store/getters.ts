import { PETS } from './state'

export const ALL_PETS = 'PET_LIST'

export default {
  [ALL_PETS](state) {
    return state[PETS]
  },
}
