// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import 'vuetify/dist/vuetify.css'
// import colors from 'vuetify/lib/util/colors'
import vuetify from '@/plugins/vuetify'
Vue.config.productionTip = false

Vue.use(Vuetify)

// export default new Vuetify({
//   theme: {
//     themes: {
//       light: {
//         primary: colors.red.darken1, // #E53935
//         secondary: colors.red.lighten4, // #FFCDD2
//         accent: colors.indigo.base // #3F51B5
//       }
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
}).$mount('#app')
