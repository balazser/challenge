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
  deals = null

  get isResultShown() {
    return this.deals && this.deals.length > 0
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
    return <b-container fluid>
      <b-row class="my-1">
        <b-col sm="12">
          <ResultList deals={this.deals} currency={this.currency} />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="12">
          <div style="font-size:2em" class="text-right font-weight-bold">Sum: {sumBy((d) => applyDiscount(d.discount, d.cost), this.deals)} {this.currency}</div>
        </b-col >
      </b-row>
    </b-container>
  }

  renderNoResults() {
    return <b-container fluid>
      <b-row class="my-1">
        <b-col sm="12">
          No direction was found. :(
          </b-col >
      </b-row>
    </b-container>
  }

  render() {
    return (
      <div id="app" >
        <b-container fluid>
          <b-row class="my-1">
            <b-col lg="4">
              <h2 class="my-4 pl-3">Search direction</h2>
              <Form onSearching={this.handleSearching} />
              {this.isResultShown ? this.renderResult() : undefined}
              {this.deals && this.deals.length === 0 ? this.renderNoResults() : undefined}
            </b-col >
          </b-row>
        </b-container>
      </div>
    )
  }
}
</script>

<style lang="scss" >
</style>
