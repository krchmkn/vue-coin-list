import 'reset-css';
import Vue from 'vue';
import App from '@/App.vue';
import http from '@/plugins/http';
import infiniteScroll from 'vue-infinite-scroll';

Vue.config.productionTip = false;
Vue.use(http, {
  baseURL: 'https://min-api.cryptocompare.com',
  headers: {
    'Authorization': 'Apikey f129c0f863f624f59077b960a8501f9097d4be0253e3c7a89d2b4e17f17cb17c'
  }
});
Vue.use(infiniteScroll);

new Vue({
  render: h => h(App),
}).$mount('#app');
