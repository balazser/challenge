import axios from 'axios'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import actions, { FETCH_PETS, ADOPT_PET } from './actions'

jest.mock('axios')

describe('Actions', () => {
  let actionContext
  beforeEach(() => {
    actionContext = {
      commit: jest.fn(),
    }
  })

  it('should initially fetch all pets', async() => {
    const petName = 'Mocky'
    axios.get.mockResolvedValue(Promise.resolve([{ name: petName }]))
    const response = await actions[FETCH_PETS](actionContext)
    expect(actionContext.commit.mock.calls[0][1][0]).toEqual({
      name: petName,
    })
  })
})
