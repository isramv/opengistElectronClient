import Vue from 'vue'
import Router from 'vue-router'
import loginComponent from './loginComponent.vue'
import gistMainComponent from './Gists/gistMainComponent.vue'

Vue.use(Router);

var router = new Router();

router.map({
    '/login': {
        name: 'login',
        component: loginComponent
    },
    '/app': {
        name: 'app',
        component: gistMainComponent
    }
});

router.beforeEach(function(transition) {
    if(localStorage.getItem('username') == null) {
        router.go('login');
    } else {
        router.go('app');
    }
    transition.next();
});

export default router