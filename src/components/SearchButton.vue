<template>
  <button name="search-button" class="search-button" @click="searchCities">Search</button>
</template>

<script>
export default {
  name: 'search-button',
  methods: {
    searchCities () {
      this.$emit('search-cities', false)
    }
  }
}
</script>
<style scoped lang="scss">
.search-button {
  border: 1px solid #30323D;
  cursor: pointer;
  text-align: center;
  background: #E8C547;
  color: #30323D;
  height: 42px;
  width: 140px;
  font-size: 24px;
  padding: 0px;
  transition: 0.3s;
  margin-left: 30px;

  &:hover {
    transform: scale(1.1);
    outline: none;
  }
}
@media (max-width: 640px) {
   .search-button {
    margin-left: 0;
    font-size: 18px;
  }
 }
</style>
