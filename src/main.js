import Vue from 'vue'
import App from './App.vue'
import './scss/main.scss'

Vue.config.productionTip = false

Vue.component('cities-list', resolve => {
  require(['@/components/CitiesList'], resolve)
})
Vue.component('resolve-message', resolve => {
  require(['@/components/ResolveMessage'], resolve)
})

new Vue({
  render: h => h(App),
}).$mount('#app')
