import Vue from 'vue'
import Router from 'vue-router'
import loginComponent from './Gists/loginComponent.vue'
import gistMainComponent from './Gists/gistMainComponent.vue'
import newGist from './Gists/newGist.vue'
import viewGist from './Gists/viewGist.vue'
import store from './vuex_store'

Vue.use(Router);

var router = new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      meta: {
        requireAuth: false
      },
      component: loginComponent
    },
    {
      name: 'main',
      path: '/gistapp',
      meta: {
        requireAuth: true
      },
      component: gistMainComponent,
      children: [
        {
          name: 'newGist',
          path: 'new',
          meta: {
            requireAuth: true
          },
          component: newGist
        },
        {
          name: 'editGist',
          path: 'edit/:id',
          meta: {
            requireAuth: true
          },
          component: newGist
        },
        {
          name: 'viewGist',
          path: 'view/:id',
          meta: {
            requireAuth: true
          },
          component: viewGist
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {

  // initialize store if from is null
  if(from.name === null) {
    store.dispatch('initializeStore').then((e)=> {

    })
  }

  if (to.meta.requireAuth && !store.state.isAuth) {
    next({name: 'login'})
  } else if (from.name === null && to.name === 'login' && store.state.isAuth) {
    next({name: 'main'})
  } else if (to.meta.requireAuth && !store.state.isAuth) {
    next(false)
  } else if (to.meta.requireAuth && store.state.isAuth) {
    next()
  } else {
    next()
  }

});

export default router