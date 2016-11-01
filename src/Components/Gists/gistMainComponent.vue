<style lang="sass" xml:lang="scss">
    .table-container {
        background-color: #eaeaea;
        padding-top: 12px;
        padding-bottom: 12px;
        border-right: 1px solid #d2d2d2;
        border-bottom: 1px solid #d2d2d2;
    }
    .table-filter {
        margin-bottom: 12px;
    }
    .rc-container {
        margin: 15px 0;
    }
    table {
        border: 0;
        tr:nth-child(odd) {
            background: #f1f1f1;
        }tr:nth-child(even) {
             background: #fafafa;
         }
        tbody {
            > tr {
                > td {
                    border-top: 0!important;
                    a {
                        color: #464646;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-3 table-container">
            <div class="rc-container">
                <a class="btn btn-default btn-sm" @click="fetchGists()">Update index</a>
                <router-link to="/gistapp/new" class="btn btn-default btn-sm">New</router-link>
            </div>
            <table-gist></table-gist>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-9 show-gist-container">
            <admin-bar></admin-bar>
            <div class="rc-container">
                <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="loading"></i>{{ loadingMessage }}
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
  import _ from 'lodash'
  import store from '../vuex_store'
  import tableGistComponent from './tableGist.vue'
  import adminBarComponent from './adminBarComponent.vue'
  import keymaster from 'keymaster'
  export default{
    components: {
      'table-gist': tableGistComponent,
      'admin-bar': adminBarComponent
    },
    store: store,
    computed: {
      username() {
        return this.$store.state.username
      },
      auth() {
        return this.$store.state.auth
      },
      loading() {
        return this.$store.state.loading.status
      },
      loadingMessage() {
        return this.$store.state.loading.message
      }
    },
    beforeCreate() {
      if (localStorage.username !== null) {
        this.$store.commit('USERNAME', localStorage.username)
      }
      if (localStorage.auth !== null) {
        this.$store.commit('AUTH', localStorage.auth)
      }
    },
    created() {
      let self = this
      // @todo if computed gist is empty trigger fetchGists
      keymaster('command+n', function () {

      });
      keymaster('command+escape', function () {

      });
      keymaster('command+e', function () {

      });
    },
    methods: {
      fetchGists() {
        this.$store.dispatch('getGists')
      }
    }
  }
</script>
