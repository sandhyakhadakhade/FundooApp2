import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VTooltip from 'v-tooltip'
import "vue-flex/dist/vue-flex.css";
import VueFlex from "vue-flex";
Vue.use(VueFlex);
Vue.use(VTooltip)

import Snackbar from 'vuejs-snackbar';
Vue.component('snackbar', Snackbar);



import VModal from 'vue-js-modal'
 
Vue.use(VModal)


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

Vue.use(require('vue-moment'));

// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min.js')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('froala-editor/css/froala_style.min.css')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)








import VueFilter from 'vue-filter';
Vue.use(VueFilter);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
