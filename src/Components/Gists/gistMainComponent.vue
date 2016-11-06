<style lang="sass" xml:lang="scss">
    .gist-main-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: stretch;
      align-items: stretch;
      height: 100%;
      overflow: scroll;
      .side-menu {
        background: #27456F;
        width: 59px;
        .side-menu_item {
          &:first-child {
            margin-top: 15px;
          }
          margin-left: 15px;
          margin-bottom: 15px;
          i {
            color: #70A2E7;
            &:hover {
              color: #fff;
            }
          }
        }
      }
      .table-container {
        background: #E6E6E6;
        padding: 10px;
        width: 290px;
        overflow: scroll;
      }
      .show-gist-container {
        background: #f8f6f6;
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
            <ul class="list-unstyled">
                <li class="side-menu_item"><a @click="fetchGists()"><i class="fa fa-refresh fa-2x" aria-hidden="true"></i></a></li>
                <li class="side-menu_item"><router-link to="/gistapp/new"><i class="fa fa-plus-square fa-2x" aria-hidden="true"></i></router-link></li>
            </ul>
        </div>
        <div class="flex-item table-container">
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
      keymaster('command+n', function() {
          self.$router.push({ name: 'newGist' })
      })
      keymaster('command+escape', function() {
          self.$router.go(-1)
      })
    },
    methods: {
      fetchGists() {
        this.$store.dispatch('getGists')
      }
    }
  }
</script>
