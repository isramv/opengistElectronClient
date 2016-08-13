<template>
    <h1 class="gist-title">{{ gist.title }}</h1>
    <div class="show-container">
        <div id="gist-content">
            {{{ gist.marked }}}
        </div>
    </div>
    <div class="gist-tags">
        <div class="actions">
            <a class="btn btn-default btn-sm" @click="editGist(gist.id)">Edit</a>
        </div>
        <h3 class="small-title">Tags:</h3>
        <ul class="list">
            <li v-for="tag in gist.tags"><a class="btn btn-default btn-xs btn-info" v-on:click="showRelatedGists(tag.id)">{{ tag.name }}</a></li>
        </ul>
        <show-related-gists></show-related-gists>
    </div>
</template>
<style lang="sass" xml:lang="scss">
    .btn-sm {
        border: 0;
    }
    div.actions {
        padding-left: 10px;
        margin-top: 0;
    }
    .small-title {
        margin: 10px;
        font-weight: bold;
    }
    .show-gist-container {
        width: 900px;
        overflow-y: scroll;
        padding: 12px 0 34px 24px;
        h1 {
        margin-top: 0;
        }
    }
    #gist-content {
        width: 650px;
        background: #FFFFFF;
        padding: 22px 37px 22px 27px;
        -webkit-box-shadow: 0px 3px 5px -1px rgba(69,69,69,.25);
        -moz-box-shadow: 0px 3px 5px -1px rgba(69,69,69,.25);
        box-shadow: 0px 3px 5px -1px rgba(69,69,69,.25);
    }
    .gist-title {
        margin-bottom: 0;
        padding: 20px 0;
        font-family: "Ubuntu";
        font-weight: bold;
    }
    #gist-content {
        max-width: 700px;
    }
    .gist-tags {
        width: 225px;
        float: left;
        .list {
            text-align: left;
            padding-left: 10px;
            li {
                list-style: none;
                margin-bottom: 5px;
            }
        }
    }
    .show-container {
        float: left;
    }
    .actions {
        margin: 5px 0;
    }
</style>
<script>
    import _ from 'lodash'
    import marked from 'marked'
    import store from '../store'
    import showRelatedGists from './showRelatedGists.vue'
    export default{
        data () {
            return store;
        },
        watch: {
          'gist': function(oldVal, newVal) {
              let self = this;
              if(!_.isUndefined(newVal.id)) {
                self.$broadcast('clear-data');
              }
          }
        },
        components: {
            'show-related-gists': showRelatedGists
        },
        beforeCompile () {
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
                self.$broadcast('show-related-gists', relatedGist);
            },
            editGist(gistId) {
                let self = this;
                self.$dispatch('edit-gist', gistId);
                this.$broadcast('edit-gist');
            }
        }
    }
</script>
