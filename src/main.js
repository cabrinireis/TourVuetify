import Vue from 'vue'
import App from './App.vue'
import router from './router'
import state from './store'
import vuetify from './plugins/vuetify';
import FirebaseVue from './firebase'

Vue.use(FirebaseVue)
Vue.config.productionTip = false

const vm = new Vue({
  router,
  store:state,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export {vm};