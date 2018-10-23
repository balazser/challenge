<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import MyButton from './components/MyButton.vue'
import { Mutation, State, Getter, Action } from './store'
import * as store from './store'

import Profile from './components/Profile.vue'

@Component({})
export default class App extends Vue {
  @Getter(store.ALL_PETS) allPets
  @Action(store.FETCH_PETS) fetchPets
  @Action(store.ADOPT_PET) adoptPet

  mounted() {
    this.fetchPets()
  }

  async handleAdopting(id) {
    await Promise.resolve()
  }

  render() {
    return (
      <div id="app" style="padding: 5vw">
        <h1>Adopt a dog today! </h1>
        <div style="display: flex;">
          {this.allPets.map(p => {
            return (
              <Profile
                id={p.id}
                name={p.name}
                style="margin-right: 25px"
                onAdopted={id => this.handleAdopting(id)}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss">
@import './assets/sass/index.scss';
</style>
