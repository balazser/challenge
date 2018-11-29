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
  deals = [
    {
      "transport": "train",
      "departure": "London",
      "arrival": "Amsterdam",
      "duration": { "h": "05", "m": "00" },
      "cost": 160,
      "discount": 0,
      "reference": "TLA0500"
    },
    {
      "transport": "bus",
      "departure": "London",
      "arrival": "Amsterdam",
      "duration": { "h": "07", "m": "45" },
      "cost": 40,
      "discount": 25,
      "reference": "BLA0745"
    },
    {
      "transport": "car",
      "departure": "London",
      "arrival": "Amsterdam",
      "duration": { "h": "04", "m": "45" },
      "cost": 120,
      "discount": 0,
      "reference": "CLA0445"
    }]



  get areResultsShown() {
    return this.deals.length > 0
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
        {this.areResultsShown ? <Results deals={this.deals} currency={"€"} /> : undefined}
      </div>
    )
  }
}
</script>

<style lang="scss" >
</style>
