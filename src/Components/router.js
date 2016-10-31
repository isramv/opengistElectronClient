import Vue from 'vue'
import Router from 'vue-router'
import loginComponent from './Gists/loginComponent.vue'
import gistMainComponent from './Gists/gistMainComponent.vue'
import newGist from './Gists/newGist.vue'
import viewGist from './Gists/viewGist.vue'

Vue.use(Router);

var router = new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: loginComponent
    },
    {
      name: 'main',
      path: '/gistapp',
      component: gistMainComponent,
      children: [
        {
          name: 'newGist',
          path: 'new',
          component: newGist
        },
        {
          name: 'editGist',
          path: 'edit/:id',
          component: newGist
        },
        {
          name: 'viewGist',
          path: 'view/:id',
          component: viewGist
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('// to: //')
  // console.log(to)
  // console.log('// from: //')
  // console.log(from)
  // console.log('///////////')
  next()
  // let goesToSecurePath = to.path === '/gistapp'
  // let nouser = localStorage.getItem('username') === null
  // if (to.path === '/' && !nouser) {
  //   console.log(1)
  //   next(false)
  // } else if (goesToSecurePath && nouser) {
  //   console.log(2)
  //   next({path: '/'})
  // } else if (goesToSecurePath && !nouser) {
  //   console.log(3)
  //   next()
  // } else {
  //   console.log(4)
  //   next()
  // }

});

export default router