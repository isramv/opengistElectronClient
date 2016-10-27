<template>
    <div>
        <h1>Hello World {{ gistId }}</h1>
        <!--<h1 class="gist-title">{{ gist.title }}</h1>-->
        <!--<div class="row actions">-->
            <!--<button class="btn btn-default btn-sm" @click="editGist(gist.id)">Edit</button>-->
        <!--</div>-->
        <!--<div id="gist-content">-->
            <!--<div v-html="gist.marked"></div>-->
            <!--<ul class="list-inline">-->
                <!--<li v-for="tag in gist.tags"><a class="btn btn-default btn-xs btn-info" v-on:click="showRelatedGists(tag.id)">{{ tag.name }}</a></li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--<show-related-gists></show-related-gists>-->
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
    import store from '../store'
//    import showRelatedGists from './showRelatedGists.vue'
    export default{
        computed: {
            gistId() {
                return this.$route.params.id
            }
        },
        beforeCreate() {
            // todo fetch the gist to edit.
            // if user_offline, get the localStorage version.

        }
//        data () {
//            return store;
//        },
//        watch: {
//          'gist': function(oldVal, newVal) {
//              let self = this;
//              if(!_.isUndefined(newVal.id)) {
//                self.$broadcast('clear-data');
//              }
//          }
//        },
//        components: {
//            'show-related-gists': showRelatedGists
//        },
//        beforeCompile () {
//            var lastGistViewed = JSON.parse(localStorage.getItem('gistViewed'));
//            if(lastGistViewed) {
//                this.viewGist(lastGistViewed);
//            }
//        },
//        events: {
//            'view-gist': function(gist) {
//                this.viewGist(gist);
//            }
//        },
//        methods: {
//            viewGist(gist) {
//                var self = this;
//                localStorage.setItem('gistViewed', JSON.stringify(gist));
//                self.$set('gist', gist);
//                if(!_.isNull(gist.body)) {
//                    self.$set('gist.marked', marked(gist.body));
//                }
//            },
//            showRelatedGists(tagId) {
//                var self = this;
//                var gists = self.$get('gists');
//                var currentGist = JSON.parse(localStorage.getItem('gistViewed'));
//                var relatedGist = [];
//                _.find(gists, function(o) {
//                    _.find(o.gist.tags, function(t) {
//                        if(t.id == tagId) {
//                            // Don't show the current gist.
//                            if(o.gist.id !== currentGist.id) {
//                                relatedGist.push(o.gist);
//                            }
//                        }
//                    });
//                });
//                self.$broadcast('show-related-gists', relatedGist);
//            },
//            editGist(gistId) {
//                let self = this;
//                // Notifies the parent.
//                self.$dispatch('edit-gist', gistId);
//                // Notifies the showRelatedGistsComponent to clear it's data.
//                this.$broadcast('edit-gist');
//            }
//        }
    }
</script>
