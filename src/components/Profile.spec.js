import { mount, shallowMount } from '@vue/test-utils'
import Profile from './Profile.vue'
import MyButton from './MyButton.vue'

describe('Profile.vue', () => {
  it('should show the pet name', () => {
    const name = 'Doggy'
    const wrapper = shallowMount(Profile, {
      propsData: { name },
    })
    expect(wrapper.text()).toMatch(name)
  })
  it('should emit when pet has taken', () => {
    // arrange
    const idPet = '123'
    const wrapper = shallowMount(Profile, {
      propsData: {
        id: idPet,
      },
    })
    const button = wrapper.find(MyButton)

    // act
    button.trigger('click')

    // assert
    expect(wrapper.vm.hasAdopted).toBeTruthy()
    const emits = wrapper.emitted('adopted')
    expect(emits).toBeTruthy()
    const [[firstParameter]] = emits
    expect(firstParameter).toBe(idPet)
  })
  it('should match with snapshot', () => {
    const wrapper = mount(Profile)
    expect(wrapper.element).toMatchSnapshot()
  })
})
