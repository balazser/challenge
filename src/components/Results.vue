<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { DateTime } from 'luxon'

import { Mutation, State, Getter, Action } from './../store'
import * as store from './../store'

@Component
export default class Form extends Vue {
  @Prop({ required: true, type: String }) currency
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
    }
  ]
  mounted() { }

  handleFormSubmited(e) {
    this.$emit("searching", {
      departure: this.departure,
      arrival: this.arrival
    })
    e.preventDefault();
  }

  get isBtnCheapestActive() {
    return this.activeButton === "cheapest"
  }

  get isSearchDisabled() {
    return this.departure === "" || this.arrival === ""
  }

  renderInfo(d) {
    return <small>{d.transport} {d.reference} for {d.duration.h}h {d.duration.h} </small>
  }

  render() {
    return (
      <b-list-group>
        {this.deals.map(d =>
          <b-list-group-item href="#" class="flex-column align-items-start">
            <img src="http://www.loremimages.com?size=100x100" alt="city preview" style="float: left" />
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{d.departure} > {d.arrival}</h5>
              <span style="font-size: 1.5em">{d.cost} {this.currency}</span>
            </div>
            <span>{this.renderInfo(d)}</span>
          </b-list-group-item>
        )}
      </b-list-group>
    )
  }
}
</script>

<style lang="scss" >
</style>
