<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { DateTime } from 'luxon'

import { Mutation, State, Getter, Action } from './../store'
import * as store from './../store'

@Component
export default class Form extends Vue {
  @Prop({ required: true, type: String }) currency
  @Prop(Array) deals

  renderInfo(d) {
    return <small>{d.transport} {d.reference} for {d.duration.h}h {d.duration.h} </small>
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
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{d.departure} > {d.arrival}</h5>
                    <span style="font-size: 1.5em">{d.cost} {this.currency}</span>
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

<style lang="scss" >
</style>
