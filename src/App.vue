<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { DateTime } from 'luxon'
import Form from './components/Form.vue';
import Results from './components/Results.vue';

import { Mutation, State, Getter, Action } from './store'
import * as store from './store'

@Component
export default class App extends Vue {
  path = []
  mounted() { }

  get areResultsShown() {
    return true
    return this.path.length > 0
  }

  handleSearching(e) {
    console.log(e)
    debugger
  }

  render() {
    return (
      <div id="app" style="width: 30vw;">
        <h2 class="my-4">Search direction</h2>
        <Form onSearching={this.handleSearching} />
        {this.areResultsShown ? <Results currency={"€"} /> : undefined}
      </div>
    )
  }
}
</script>

<style lang="scss" >
</style>
