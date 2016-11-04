<style lang="sass" xml:lang="scss">
    .gist-main-container {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: stretch;
        align-items: stretch;
        height: 100%;
        overflow: scroll;
        .flex-item {

        }
        .side-menu {
            background: #27456F;
            width: 59px;
        }
        .table-container {
            width: 300px;
            overflow: scroll;
        }
        .show-gist-container {
            width: 1;
            flex-grow: 1;
            flex-shrink: 0;
            flex-basis: 200px;
            overflow: scroll;
        }
    }
</style>
<template>
    <div class="gist-main-container">
        <div class="flex-item side-menu">
            here
        </div>
        <div class="flex-item table-container">
            <div class="rc-container">
                <a class="btn btn-default btn-sm" @click="fetchGists()">Update index</a>
                <router-link to="/gistapp/new" class="btn btn-default btn-sm">New</router-link>
            </div>
            <table-gist></table-gist>
        </div>
        <div class="flex-item show-gist-container">
            <admin-bar></admin-bar>
            <div class="rc-container">
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
