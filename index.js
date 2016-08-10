import Vue from 'vue'
import Bootstrap from 'bootstrap-webpack'
import fontAwesome from 'font-awesome-webpack';
import store from './src/Components/store'
import router from './src/Components/router'

let App = Vue.extend({
    data: function() {
        return store
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
router.start(App, '#app');