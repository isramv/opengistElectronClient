import Vue from 'vue'
import App from './src/Components/App.vue'
import router from './src/Components/router'

// new Vue({
//     el: '#app',
//     render: h => h(App)
// })

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

//
// let App = new Vue({
//     template: '#app',
//     data: {
//         message: 'hello FRiend'
//     }
    //router: router,
    // data: function() {
    //     return store
    // },
    // components: {
    //   'admin-bar-component': adminBarComponent
    // },
    // events: {
    //     'just-logged': function(username) {
    //         var self = this;
    //         self.$set('username', username);
    //     },
    //     'logout': function() {
    //         this.$broadcast('logout-all');
    //     }
    // }
// @todo remove deprecated
// router.start(App, '#app');