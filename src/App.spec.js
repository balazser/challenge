import axios from 'axios'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import App from './App.vue'
import Vuex from 'vuex'
import { FETCH_PETS } from './store/actions'
import { ALL_PETS } from './store'

jest.mock('axios')
describe('Profile.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let actions
  let getters
  let store
  beforeEach(() => {
    actions = {
      [FETCH_PETS]: jest.fn(),
    }
    getters = {
      [ALL_PETS]() {
        return [
          {
            id: '1',
            name: 'Fifi',
          },
        ]
      },
    }
    store = new Vuex.Store({
      state: {},
      actions,
      getters,
    })
  })

  it('should initially fetch all pets', () => {
    axios.get = jest.fn(url => Promise.resolve([{ name: 'Mocky' }]))

    const wrapper = shallowMount(App, {
      store,
      localVue,
    })
    expect(actions[FETCH_PETS]).toHaveBeenCalled()
  })
})

// const $route = {
//   path: '/some/path'
// }
// const wrapper = shallowMount(Component, {
//   mocks: {
//     $route
//   }
// })
// wrapper.vm.$route.path // /some/path
