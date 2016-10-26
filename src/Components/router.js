import Vue from 'vue'
import Router from 'vue-router'
import loginComponent from './Gists/loginComponent.vue'
import gistMainComponent from './Gists/gistMainComponent.vue'
import newGist from './Gists/newGist.vue'

Vue.use(Router);

var router = new Router({
    routes: [
        { path: '/', component: loginComponent },
        {
            path: '/gistapp',
            component: gistMainComponent,
            children: [
                {
                    path: 'new',
                    component: newGist
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log(from)
    console.log(to)
    let goesToSecurePath = to.path === '/gistapp'
    let nouser = localStorage.getItem('username') === null
    if(to.path === '/' && !nouser) {
        console.log(1)
        next(false)
    } else if(goesToSecurePath && nouser) {
        console.log(2)
        next({ path: '/'})
    } else if(goesToSecurePath && !nouser) {
        console.log(3)
        next()
    } else {
        console.log(4)
        next()
    }
});

export default router