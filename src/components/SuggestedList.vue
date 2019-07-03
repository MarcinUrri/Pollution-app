<template>
  <ul class="city-list city-list--suggested">
    <li @click="searchCities(country)" v-for="(country, index) in autocompleteSuggestions" :key="index" >{{country}}</li>
  </ul>
</template>
<script>
export default {
  name: 'suggested-list',
  props: ['autocompleteSuggestions'],
  methods: {
    searchCities (country) {
      this.$emit('search-cities', country)
    }
  }
}
</script>
<style scoped lang="scss">
@import "../scss/_vars.scss";
.city-list {

  &--suggested {
    margin-top: 0;
    margin-bottom: 20px;

    li {
      border: 1px solid $main-yellow;
      background: $light-blue;
      color: $dark-blue;
      transition: 0.2s;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: $main-blue;
        cursor: pointer;
      }
    }
  }
}
</style>
