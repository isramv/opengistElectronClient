import Vue from 'vue'
import Router from 'vue-router'
import loginComponent from './Gists/loginComponent.vue'
import gistMainComponent from './Gists/gistMainComponent.vue'

Vue.use(Router);

var router = new Router({
    routes: [
        { path: '/', component: loginComponent },
        { path: '/gistapp', component: gistMainComponent }
    ]
});

router.beforeEach((to, from, next) => {

    let goesToSecurePath = to.path === '/gistapp'
    let nouser = localStorage.getItem('username') === null

    if(goesToSecurePath && nouser) {
        next(false)
    } else {
        next()
    }

});

export default router