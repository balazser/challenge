import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export { Getter, State, Mutation, Action } from 'vuex-class'

export default {
  state,
  mutations,
  actions,
  getters,
  modules: {},
}

export * from './actions'
export * from './state'
export * from './mutations'
export * from './getters'
