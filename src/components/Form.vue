<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { DateTime } from 'luxon'

import { Mutation, State, Getter, Action } from './../store'
import * as store from './../store'

@Component
export default class Form extends Vue {
  departure = ""
  arrival = ""
  activeButton = "cheapest"
  mounted() {
  }

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

  render() {
    return (
      <b-form onSubmit={this.handleFormSubmited} >
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3"><label for="departure">Departure:</label></b-col>
            <b-col sm="9"><b-form-input id="deprature" type="text" onInput={e => this.arrival = e}></b-form-input></b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3"><label for="departure">Arrival:</label></b-col>
            <b-col sm="9"><b-form-input id="deprature" type="text" onInput={e => this.departure = e}></b-form-input></b-col>
          </b-row>
          <b-row class="my-4">
            <b-col>
              <b-button-group sm="5">
                <b-button class={{ active: this.isBtnCheapestActive }} onClick={() => this.activeButton = "cheapest"}>Cheapest</b-button>
                <b-button class={{ active: !this.isBtnCheapestActive }} onClick={() => this.activeButton = "fastest"}>Fastest</b-button>
              </b-button-group>
            </b-col>
            <b-col offset-sm="4" sm="3">
              <b-button type="submit" variant="success" disabled={this.isSearchDisabled} class="w-100">Search</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    )
  }
}
</script>

<style lang="scss" >
</style>
