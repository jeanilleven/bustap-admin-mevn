import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'materialize-css/dist/css/materialize.min.css'

Vue.config.productionTip = false

require('../public/sass/style.scss')

new Vue({
  el: '#app',
  router: router,
  // components: { App },
  render: h => h(App),
  // template: '<App/>'
})
