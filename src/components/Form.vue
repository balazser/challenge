<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { DateTime } from 'luxon'

import { Mutation, State, Getter, Action } from './../store'
import * as store from './../store'

import { SearchType } from './SearchType';
import cities from '../constants/cities';

@Component
export default class Form extends Vue {
  departure = ""
  arrival = ""
  searchType = SearchType.Cheapest

  mounted() {
    document.addEventListener('click', this.resetAutocomplete)
  }

  beforeDestroy() {
    document.removeEventListener('click', this.resetAutocomplete)
  }

  handleFormSubmited(e) {
    this.$emit("searching", {
      departure: this.departure,
      arrival: this.arrival,
      searchType: this.searchType
    })
    e.preventDefault();
  }

  get isBtnCheapestActive() {
    return this.searchType === SearchType.Cheapest
  }

  get isSearchDisabled() {
    return this.departure === "" || this.arrival === ""
  }

  isDeparturesOpened = false
  isArrivalOpened = false

  resetAutocomplete() {
    this.isDeparturesOpened = false
    this.isArrivalOpened = false
  }

  handleDepartureClicked(value) {
    this.isDeparturesOpened = false
    this.departure = value
  }
  handleArrivalClicked(value) {
    this.isArrivalOpened = false
    this.arrival = value
  }

  renderCitiesAutocomplete(isOpened, value, onClicked) {
    return <div style="position: relative; z-index: 2;" class={{ "d-none": !isOpened }}>
      <div style="position: absolute; left: 0; right: 0;" >
        <b-list-group>
          {cities
            .filter(c => c.match(new RegExp(value, "i")))
            .map(c => <b-list-group-item href="#" onClick={() => onClicked(c)}>{c}</b-list-group-item>)}
        </b-list-group>
      </div>
    </div>
  }

  render() {
    return (
      <b-form onSubmit={this.handleFormSubmited} >
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3"><label for="departure">Departure:</label></b-col>
            <b-col sm="9">
              <b-form-input
                id="deprature"
                type="text"
                autocomplete="off"
                value={this.departure}
                nativeOnClick={(e) => { e.stopPropagation(); this.isDeparturesOpened = true }}
                onInput={e => this.departure = e}
              ></b-form-input>
              <div style="position: relative; z-index: 2;" class={{ "d-none": !this.isDeparturesOpened }}>
                <div style="position: absolute; left: 0; right: 0;" >
                  <b-list-group>
                    {cities
                      .filter(c => c.match(new RegExp(this.departure, "i")))
                      .map(c => <b-list-group-item href="#" onClick={() => this.handleDepartureClicked(c)}>{c}</b-list-group-item>)}
                  </b-list-group>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3"><label for="departure">Arrival:</label></b-col>
            <b-col sm="9">
              <b-form-input
                id="arrival"
                type="text"
                autocomplete="off"
                value={this.arrival}
                nativeOnClick={(e) => { e.stopPropagation(); this.isArrivalOpened = true }}
                onInput={e => this.arrival = e}
              ></b-form-input>
              {this.renderCitiesAutocomplete(this.isArrivalOpened, this.arrival, this.handleArrivalClicked)}
            </b-col>
          </b-row>
          <b-row class="my-4">
            <b-col offset-lg="3" lg="1" >
              <b-button-group>
                <b-button class={{ active: this.isBtnCheapestActive }} onClick={() => this.searchType = SearchType.Cheapest}>Cheapest</b-button>
                <b-button class={{ active: !this.isBtnCheapestActive }} onClick={() => this.searchType = SearchType.Fastest}>Fastest</b-button>
              </b-button-group>
            </b-col>
            <b-col offset-lg="5" lg="3" offset-lg="5" lg="3" class="my-3 my-lg-0">
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
