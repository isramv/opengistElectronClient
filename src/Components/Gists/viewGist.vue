<template>
    <div>
        <div class="row actions">
          <button class="btn btn-default btn-sm" @click="editGist(gist.id)">Edit</button>
        </div>
        <h1 class="gist-title">{{ gist.title }}</h1>
        <div id="gist-content">
            <div v-html="gistRender"></div>
            <ul class="list-inline">
                <li v-for="tag in gist.tags"><a class="btn btn-default btn-xs btn-info" v-on:click="showRelatedGists(tag.id)">
                    {{ tag.name }}</a></li>
            </ul>
        </div>
        <show-related-gists></show-related-gists>
    </div>
</template>
<style lang="sass" xml:lang="scss">
    .show-gist-container {
        background-color: #ffffff;
        padding:34px;
        padding-top: 12px;
        h1 {
        margin-top: 0;
        }
    }
    .gist-title {
        border-bottom: 1px solid #d2d2d2;
        margin-bottom: 0;
        padding-bottom: 12px;
    }
    #gist-content {
        max-width: 650px;
    }
    .actions {
        margin: 5px 0;
    }
</style>
<script>
  import _ from 'lodash'
  import marked from 'marked'
  import store from '../vuex_store'
  import showRelatedGists from './showRelatedGists.vue'
  export default{
    computed: {
      gistId() {
        return this.$route.params.id
      },
      gist() {
          return this.$store.state.viewGist.gist
      },
      gistRender () {
          if(this.$store.state.viewGist.gist.body.length > 0) {
              return marked(this.$store.state.viewGist.gist.body)
          } else {
              return ''
          }
      }
    },
    beforeRouteEnter (to, from, next) {
//        console.log('// entering viewGist //')
        store.dispatch('viewGist', to.params.id).then(() => {
            next()
        }).catch((e) => {
          console.log(e)
        })

    },
    beforeRouteLeave (to, from, next) {
      if(to.name === 'editGist') {
        // if next page is editGist route.
        // fetch the gistToEdit and attach it to newGist state in the store.
        this.$store.dispatch('getOneGistToEdit', to.params.id).then(() => {
          next()
        })
      } else {
        next()
      }
    },
    watch: {
      gistId (val, oldVal) {
        console.log(val, oldVal)
        this.$store.dispatch('viewGist', val).then(() => {
          this.$store.dispatch('showRelatedGists', { tagId: 0, gistId: 0})
        })
      }
    },
    components: {
      'show-related-gists': showRelatedGists
    },
    methods: {
      showRelatedGists (tid) {
        let gid = _.toInteger(this.gistId)
        this.$store.dispatch('showRelatedGists', { tagId: tid, gistId: gid})
      },
      editGist(id) {
        this.$router.push({ name: 'editGist', params: {id: id }})
      }
    }
  }
</script>
