import { PETS } from './state'

export const ADD_PETS = 'ADD_PETS'
export const MARK_PET_ADOPTED = 'MARK_PET_ADOPTED'

export default {
  [ADD_PETS](state, pets) {
    const petsUniq = pets.filter(p => !state[pets].some(p2 => p2.id === p.id))
    state[PETS].push(...petsUniq)
  },
}
