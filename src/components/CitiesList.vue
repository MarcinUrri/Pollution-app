<template>
  <ul class="city-list city-list--cities">
    <li class="city-list__single-city" @click="requestCityDescription(city.city)" 
      v-for="city in cities" 
      :key="city.name">
      <strong class="city-list__city-name">{{city.city}} </strong>pollution count - {{city.count}}
      <p :class="[{'city-list__desc--active': city.active}, 'city-list__desc']">{{city.desc}}</p>
    </li>
  </ul>
</template>
<script>
import axios from 'axios'
import {apiParameters} from '@/utils/api-parameters.js'
import {errorMessages} from '@/utils/error-messages.js'
export default {
  name: 'cities-list',
  props: ['citiesList'],
  data: function () {
    return {
      cities: this.citiesList
    }
  },
  methods: {
   requestCityDescription(cityName) {
      this.cities.forEach(city => {
        this.activeSingleCityDescription(cityName, city)
        if (city.desc === undefined && cityName === city.city) {
          this.$set(city, 'desc', 'loading description...')
          axios.get(`${'https://cors-anywhere.herokuapp.com/'}${apiParameters.wiki.https}action=${apiParameters.wiki.action}&format=${apiParameters.wiki.format}&search=${cityName}`)
          .then(response => {
            this.displayCityDescription(this.cities.indexOf(city), response)
          })
          .catch(() => {
            this.$set(city, 'desc', errorMessages.loadingCityDescription)
          })
        } else {
          return
        }
      })
    },
    activeSingleCityDescription(cityName, singleCity) {
      if (cityName === singleCity.city) {
        this.$set(singleCity, 'active', true)
      } else {
        this.$set(singleCity, 'active', false)
      }
    },
    displayCityDescription (cityIndex, response) {
      if (response.data[2].length === 0 || response.data[2][0] === '') {
        this.$set(this.cities[cityIndex], 'desc', errorMessages.cityDescriptionNotFound)
      } else {
        this.$set(this.cities[cityIndex], 'desc', response.data[2][0])
      }
    }
  },
  watch: {
    citiesList (newValue) {
      this.cities = newValue
    }
  }
}
</script>
<style scoped lang="scss">
@import "../scss/_vars.scss";
.city-list {

  &__single-city {
    cursor: pointer;
    background: #99ceff;
    border: 2px solid $main-yellow;
    padding: 20px;

    &:hover {
      background: #339cff;
    }
  }

  &__city-name {
    color: $dark-blue;
    font-size: 18px;
  }

  &__desc {
    max-height: 0px;
    overflow: hidden;

    &--active {
      max-height: 500px;
      transition: 1s;
    }
  }

  &--cities {
    width: 60%;
    margin-left: 20%;
  }
}
@media (max-width: 640px) {
   .city-list {

    &--cities {
      width: 100%;
      margin-left: 0%;
    }
  }
 }
</style>
