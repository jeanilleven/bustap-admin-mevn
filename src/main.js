import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'materialize-css/dist/css/materialize.min.css'
import firebase from 'firebase'
import './components/firebase/firebaseInit'

Vue.config.productionTip = false

require('../public/sass/style.scss')

let app
firebase.auth().onAuthStateChanged(()=> {
  if(!app){
    app = new Vue({
      el: '#app',
      router: router,
      // components: { App },
      render: h => h(App),
      // template: '<App/>'
    })
  }
})


