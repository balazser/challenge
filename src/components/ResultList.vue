<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { DateTime } from 'luxon'

import { Mutation, State, Getter, Action } from './../store'
import * as store from './../store'

import { applyDiscount, hasDiscount } from '../services/deal'

@Component
export default class ResultList extends Vue {
  @Prop({ required: true, type: String }) currency
  @Prop(Array) deals

  renderInfo(deal) {
    return <small>{deal.transport} {deal.reference} for {deal.duration.h}h {deal.duration.m} </small>
  }

  renderDiscount(deal) {
    return <span>
      <span style="font-size: 1.25em" class="new-price">{applyDiscount(deal.discount, deal.cost)} {this.currency}</span>
      <span style="font-size: 1.25em" class="new-price">You save {deal.discount}%</span>
    </span>
  }

  render() {
    return (
      <b-list-group>
        {this.deals.map(d =>
          <b-list-group-item href="#" class="flex-column align-items-start">
            <b-container fluid class="px-0">
              <b-row class="my-1">
                <b-col cols="12" md="3">
                  <img src="http://www.loremimages.com?size=120x120" alt="city preview" style="float: left" class="w-100 px-md-1" />
                </b-col>
                <b-col cols="12" md="9">
                  <b-row class={{ discount: d.discount > 0 }}>
                    <b-col cols="12" md="7" class="pl-md-0 mt-2 mt-md-0">
                      <h5 class="mb-1">{d.departure} > {d.arrival}</h5>
                      <span>{this.renderInfo(d)}</span>
                    </b-col>
                    <b-col cols="12" md="5" class="text-left text-md-right">
                      <span>
                        <span style="font-size: 1.25em" class="old-price">{d.cost} {this.currency}</span>
                        {hasDiscount(d) ? this.renderDiscount(d) : undefined}
                      </span>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-container>
          </b-list-group-item>
        )}
      </b-list-group>
    )
  }
}
</script>

<style lang="scss" scoped>
.discount {
  .old-price {
    text-decoration: line-through;
  }
  .new-price {
    display: block;
    color: red;
  }
}
</style>
