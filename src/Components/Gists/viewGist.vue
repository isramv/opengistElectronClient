<template>
  <div class="gs-viewgist-wrapper">
    <div class="gs-viewgist-container">
      <h1 class="gist-title">{{ gist.title }}</h1>
      <div class="row actions">
        <button class="btn btn-default btn-sm" @click="editGist(gist.id)">Edit</button>
        <button class="btn-sm btn btn-sm" data-toggle="modal" data-target="#deleteGist">Delete</button>
      </div>
      <div id="gist-content">
        <div v-html="gistRender"></div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="deleteGist" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                      aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Delete Gist: {{ gist.title }}
                <i v-show="deleteLoading" class="fa fa-cog fa-spin fa-fw"></i>
              </h4>
            </div>
            <div class="modal-body">
              <p>This Gist is about to get deleted, this means that there is not step back.
                Are you sure you want to continue?
                If so press `Delete`.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-sm btn-danger btn-sm" v-on:click="deleteGist(gist.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="view-gist-right">
      <ul class="list-related list-unstyled">
        <li v-for="tag in gist.tags"><a class="btn btn-default btn-xs btn-info" v-on:click="showRelatedGists(tag.id)">
          {{ tag.name }}</a></li>
      </ul>
      <show-related-gists></show-related-gists>
    </div>
  </div>
</template>
<style lang="sass" xml:lang="scss">
  .gs-viewgist-wrapper {
     display:flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: flex-start;
     align-content: flex-start;
     align-items: flex-start;
    .gs-viewgist-container {
      background: #fff;
      width: 690px;
      height: 1;
      padding: 15px 27px;
      -webkit-box-shadow: 0px 3px 10px 0px rgba(87,87,87,.3);
      overflow: scroll;
      margin-bottom: 15px;
    }
    .view-gist-right {
      padding: 0 10px;
      flex-grow: 1;
      flex-shrink: 0;
    }
  }
  .show-gist-container {
    background-color: #ffffff;
    padding: 34px;
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
  .actions {
    margin-bottom: 30px;
  }
  ul.list-related {
    li {
      margin-bottom: 5px;
    }
  }
</style>
<script>
  import _ from 'lodash'
  import $ from 'jquery'
  import marked from 'marked'
  import store from '../vuex_store'
  import showRelatedGists from './showRelatedGists.vue'
  import keymaster from 'keymaster'
  export default{
    name: 'viewGist',
    data() {
        return {
          deleteLoading: false
        }
    },
    computed: {
      gistId() {
        return this.$route.params.id
      },
      gist() {
          return this.$store.state.viewGist.gist
      },
      gistRender () {
          if(this.$store.state.viewGist.gist.body.length > 0) {

              let body = this.$store.state.viewGist.gist.body;

              let renderer = new marked.Renderer();
              renderer.link = function(href, title, text) {
                if (this.options.sanitize) {
                  try {
                    var prot = decodeURIComponent(unescape(href))
                            .replace(/[^\w:]/g, '')
                            .toLowerCase();
                  } catch (e) {
                    return '';
                  }
                  if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
                    return '';
                  }
                }
                var out = '<a target="_blank" class="link-view-gist" href="' + href + '"';
                if (title) {
                  out += ' title="' + title + '"';
                }
                out += '>' + text + '</a>';
                return out;
              }

              renderer.paragraph = function(text) {
                  let textFiltered = text.replace(/<a/, '<a target="_blank"');
                  return '<p>' + textFiltered + '</p>\n';
              }

              return marked(body, { renderer: renderer})


          } else {
              return ''
          }
      }
    },
    beforeRouteEnter (to, from, next) {
        store.dispatch('viewGist', to.params.id).then(() => {
            next()
        }).catch((e) => {

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
      gistId (val) {
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
      },
      deleteGist(id) {
        this.$data.deleteLoading = true
        this.$store.dispatch('deleteGist', id).then((e) => {
          this.$data.deleteLoading = false
          $('#deleteGist').modal('hide')
          this.$router.push({ name: 'main' })
        }).catch((e) => {
          this.$data.deleteLoading = false
          $('#deleteGist').modal('hide')
        })
      }
    }
  }
</script>
