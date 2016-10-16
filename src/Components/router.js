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
export default router

// router.beforeEach((to, from, next) => {
//     if(localStorage.getItem('username') == null) {
//         next({
//             path: '/',
//             query: { redirect: to.fullPath }
//         })
//     } else {
//         next({
//             path: '/gistapp',
//             query: { redirect: to.fullPath }
//         })
//     }
// });

// @todo deprecated
// router.map({
//     '/login': {
//         name: 'login',
//         component: loginComponent
//     },
//     '/app': {
//         name: 'app',
//         component: gistMainComponent
//     }
// });

// router.beforeEach(function(transition) {
//     if(localStorage.getItem('username') == null) {
//         router.push('login');
//     } else {
//         router.push('app');
//     }
//     // transition.next();
// });