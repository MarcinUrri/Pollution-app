<template>
  <section>
    <div class="input-container">
      <div>
        <input 
          placeholder="Your city..." 
          autofocus @keyup.enter="searchCities(false)" 
          id="country-search" 
          class="search-input" 
          name="search-input"
          @keyup="autocompleteSearch()" 
          @focus="autocompleteSearch()" 
          @input="updateUserInput"
          v-model="userInput" 
          type="text"
          autocomplete="off"
        >
        <suggested-list 
          :filteredSuggestions="this.filteredSuggestions"
          :autocompleteSuggestions="this.autocompleteSuggestions"
          @search-cities="searchCities($event)"
        />
      </div>
      <search-button  @search-cities="searchCities($event)"/>
    </div>
    <resolve-message :resolveMessage="resolveMessage" />
    <cities-list :citiesList="cities" />
  </section>
</template>

<script>
import axios from 'axios'
import SearchButton from './SearchButton.vue'
import SuggestedList from './SuggestedList.vue'
import {countryFormatted} from '@/utils/country.js'
import {apiParameters} from '@/utils/api-parameters.js'
import {errorMessages} from '@/utils/error-messages.js'
export default {
  name: 'main-search',
  components: {
    SearchButton,
    SuggestedList,
  },
  data() {
    return {
      userInput: '',
      cities: [],
      resolveMessage: {
        error: false,
        content: ''
      },
      autocompleteSuggestions: [],
      countryFormatted: countryFormatted,
      citiesDetails: []
    }
  },
  methods: {
    updateUserInput() {
      this.$emit('update-user-input', this.userInput)
    },
    searchCities(autocomplete) {
      if(autocomplete) {
        this.userInput = autocomplete
        this.autocompleteSuggestions = []
      }
      let iso = this.countryFormatted.filter(singleCountry => {
        const regex = new RegExp(`${this.userInput}`, 'gi');
        return singleCountry.country.match(regex)
      }) 
      if (iso[0] === undefined) {
        this.informationForUser(true, errorMessages.invalidCountry)
      } else {
        this.userInput = iso[0].country
        axios.get(`${apiParameters.aq.https}country=${iso[0].iso}&limit=${apiParameters.aq.limit}&order_by[]=${apiParameters.aq.orderBy}&sort=${apiParameters.aq.sort}`)
        .then(response => {
          this.cities = response.data.results
          this.informationForUser(false, `Most polluted cities in: ${this.userInput}`)
        })
        .catch(() => {
          this.informationForUser(true, errorMessages.loadingCities)
        })
      }
      this.updateUserInput()
    },
    informationForUser(error, content) {
      this.resolveMessage.error = error
      this.resolveMessage.content = content
    },
    autocompleteSearch() {
        this.autocompleteSuggestions = this.countryFormatted.filter(element => {
          const regex = new RegExp(`${this.userInput}`, 'gi');
          return element.country.match(regex)
        })
    },
    getLocalStorageInput () {
      this.userInput = localStorage.getItem('userInput')
    }
  },
  computed: {
    filteredSuggestions : function() {
      this.autocompleteSuggestions = this.autocompleteSuggestions.map(country => {
        return country.country
      })
    }
  },
  mounted() {
    this.getLocalStorageInput()
  }
}
</script>
<style scoped lang="scss">
@import "../scss/_vars.scss";
.search-input {
  width: 250px;
  height: 30px;
  font-size: 24px;
  padding: 20px 10px;
  border: 1px solid $dark-blue;
}
.input-container {
  display: flex;
  justify-content: center;
}
@media (max-width: 640px) {
  .search-input {
    width: 150px;
    font-size: 16px;
   }
 }
</style>
