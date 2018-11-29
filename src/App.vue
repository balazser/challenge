<script>
import { sumBy } from 'lodash/fp';
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { DateTime } from 'luxon'
import Form from './components/Form.vue';
import ResultList from './components/ResultList.vue';

import { Mutation, State, Getter, Action } from './store'
import * as store from './store'

import { findCheapestPath, findFastestPath } from './services/api';
import { SearchType } from './components/SearchType';
import { applyDiscount } from './services/deal';
import { currencySign } from './services/currencySign';

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
    this.currency = currencySign(response.currency)
    this.deals = response.deals
  }

  renderResult() {
    return <div>
      <ResultList deals={this.deals} currency={this.currency} />
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="12">
            <div style="font-size:2em" class="text-right font-weight-bold">Sum: {sumBy((d) => applyDiscount(d.discount, d.cost), this.deals)} {this.currency}</div>
          </b-col >
        </b-row>
      </b-container>
    </div>
  }

  render() {
    return (
      <div id="app" style="width: 30vw;">
        <h2 class="my-4">Search direction</h2>
        <Form onSearching={this.handleSearching} />
        {this.areResultsShown ? this.renderResult() : undefined}
      </div>
    )
  }
}
</script>

<style lang="scss" >
</style>
