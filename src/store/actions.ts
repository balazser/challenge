import client from 'axios'
import { ADD_PETS } from './mutations'
export const FETCH_PETS = 'FETCH_PEOPLE'

export default {
  async [FETCH_PETS]({ commit }) {
    const response = await client.get('https://random.url/pets')

    commit(ADD_PETS, response)
  },
}
