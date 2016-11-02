<template>
    <div class="layout" id="app" v-cloak>
        <div class="container-fluid">
            <div class="row rc-container">
                <div class="col-md-12">
                  <router-link class="btn btn-default btn-sm" to="/">login</router-link>
                  <router-link class="btn btn-default btn-sm" to="/gistapp">main</router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <router-view></router-view>
                </div>
            </div>
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
    computed: {

    },
    beforeCreate() {

    },
    mounted() {

    }
  }
</script>