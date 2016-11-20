<template>
    <div class="layout" id="app" v-cloak>
        <div style="height: 100%;">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
  import bootstrap from 'bootstrap-webpack'
  import fontawesome from 'font-awesome-webpack'
  import store from './vuex_store'
  import _ from 'lodash'
  require('!style!css!sass!../scss/style.scss')
  export default {
    name: 'App'
  }
</script>