import Vue from 'vue'
// import Router from 'vue-router'
import Bootstrap from 'bootstrap-webpack'
// import loginComponent from './src/Components/loginComponent.vue'
// import tableComponent from './src/Components/tableComponent.vue'
import adminBarComponent from './src/Components/adminBarComponent.vue'
import store from './src/Components/store'
// Vue.use(Router);
import router from './src/Components/router'

let App = Vue.extend({
    data: function() {
        return store
    },
    components: {
      'admin-bar-component': adminBarComponent
    },
    events: {
        'just-logged': function(username) {
            var self = this;
            self.$set('username', username);
        },
        'logout': function() {
            this.$broadcast('logout-all');
        }
    }
});
//
// let router = new Router();
//
// router.map({
//     '/login': {
//         name: 'login',
//         component: loginComponent
//     },
//     '/app': {
//         name: 'app',
//         component: tableComponent
//     }
// });
//
// router.beforeEach(function(transition) {
//     if(localStorage.getItem('username') == null) {
//         router.go('login');
//     } else {
//         router.go('app');
//     }
//     transition.next();
// });

 router.start(App, '#app');