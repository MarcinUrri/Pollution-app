<template>
  <main id="app">
    <h1 class="title" >Search for most polluted cities in your country!</h1>
    <main-search @update-user-input="updateUserInput($event)"/>
  </main>
</template>
<script>
import MainSearch from './components/MainSearch.vue'
export default {
  name: 'app',
  components: {
    MainSearch
  },
  data () {
    return {
      userInput: ''
    }
  },
  methods: {
    updateUserInput(userInput) {
      this.userInput = userInput
    },
    localStorageInputSave () {
      localStorage.setItem('userInput', this.userInput)
    }
  },
  created () {
    window.addEventListener('beforeunload', this.localStorageInputSave)
  },
  destroyed () {
    window.removeEventListener('before', this.localStorageInputSave)
  }
}
</script>
