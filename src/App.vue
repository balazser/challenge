<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { DateTime } from 'luxon'
import Form from './components/Form.vue';
import Results from './components/Results.vue';

import { Mutation, State, Getter, Action } from './store'
import * as store from './store'

import { findCheapestPath, findFastestPath } from './services/api';
import { SearchType } from './components/SearchType';


@Component
export default class App extends Vue {
  currency = null
  deals = []

  get areResultsShown() {
    return this.deals.length > 0
  }

  async handleSearching(e) {
    const findPath = e.searchType === SearchType.Cheapest
      ? findCheapestPath
      : findFastestPath
    const response = await findPath(e.departure, e.arrival)
    this.currency = response.currency
    this.deals = response.deals
  }

  render() {
    return (
      <div id="app" style="width: 30vw;">
        <h2 class="my-4">Search direction</h2>
        <Form onSearching={this.handleSearching} />
        {this.areResultsShown ? <Results deals={this.deals} currency={this.currency} /> : undefined}
      </div>
    )
  }
}
</script>

<style lang="scss" >
</style>
