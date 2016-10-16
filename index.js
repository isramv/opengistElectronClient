import Vue from 'vue'
import App from './src/Components/App.vue'
import router from './src/Components/router'

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})