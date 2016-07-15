<template>
    <h1 class="gist-title">{{ gist.title }}</h1>
    <div class="row">
        <div class="col-xs-4 col-xs-offset-8">
            <button class="btn btn-default" v-on:click="editGist(gist.id)">Edit</button>
        </div>
    </div>
    <div id="gist-content">
        {{{ gist.marked }}}
        <div v-for="tag in gist.tags">
            <a v-on:click="showRelatedGists(tag.id)">{{ tag.name }}</a>
        </div>
    </div>
    <show-related-gists></show-related-gists>
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
        margin-bottom: 20px;
        padding-bottom: 12px;
    }
</style>
<script>
    import _ from 'lodash'
    import marked from 'marked'
    import store from './store'
    import showRelatedGists from './showRelatedGists.vue'
    export default{
        data () {
            return store;
        },
        watch: {
          'gist': function(oldVal, newVal) {
              let self = this;
              if(!_.isUndefined(newVal.id)) {
                self.$broadcast('clearRelatedGistData');
              }
          }
        },
        components: {
            'show-related-gists': showRelatedGists
        },
        beforeCompile () {
            var self = this;
            var lastGistViewed = JSON.parse(localStorage.getItem('gistViewed'));
            if(lastGistViewed) {
                this.viewGist(lastGistViewed);
            }
        },
        events: {
            'view-gist': function(gist) {
                this.viewGist(gist);
            }
        },
        methods: {
            viewGist(gist) {
                var self = this;
                localStorage.setItem('gistViewed', JSON.stringify(gist));
                self.$set('gist', gist);
                if(!_.isNull(gist.body)) {
                    self.$set('gist.marked', marked(gist.body));
                }
            },
            showRelatedGists(tagId) {
                var self = this;
                var gists = self.$get('gists');
                var currentGist = JSON.parse(localStorage.getItem('gistViewed'));
                var relatedGist = [];
                _.find(gists, function(o) {
                    _.find(o.gist.tags, function(t) {
                        if(t.id == tagId) {
                            // Don't show the current gist.
                            if(o.gist.id !== currentGist.id) {
                                relatedGist.push(o.gist);
                            }
                        }
                    });
                });
                self.$broadcast('showRelatedGists', relatedGist);
            },
            editGist(gistId) {
                this.$dispatch('edit-gist', gistId);
            }
        }
    }
</script>
