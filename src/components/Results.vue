<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { DateTime } from 'luxon'

import { Mutation, State, Getter, Action } from './../store'
import * as store from './../store'

import { applyDiscount, hasDiscount } from '../services/deal';

@Component
export default class Form extends Vue {
  @Prop({ required: true, type: String }) currency
  @Prop(Array) deals

  renderInfo(deal) {
    return <small>{deal.transport} {deal.reference} for {deal.duration.h}h {deal.duration.h} </small>
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
            <b-container fluid>
              <b-row class="my-1">
                <b-col sm="2">
                  <img src="http://www.loremimages.com?size=80x80" alt="city preview" style="float: left" />
                </b-col>
                <b-col sm="10">
                  <div class={["d-flex w-100 justify-content-between", { discount: d.discount > 0 }]}>
                    <h5 class="mb-1">{d.departure} > {d.arrival}</h5>
                    <span style="font-size: 1.25em" class="old-price">{d.cost} {this.currency}</span>
                    {hasDiscount(d) ? this.renderDiscount(d) : undefined}
                  </div>
                  <span>{this.renderInfo(d)}</span>
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
