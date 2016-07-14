<template>
    <h1 class="gist-title">{{ gist.title }}</h1>
    <div id="gist-content">
        {{{ gist.marked }}}
        <div v-for="tag in gist.tags">
            <a v-on:click="showTags(tag.id)">{{ tag.name }}</a>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import _ from 'lodash'
    import marked from 'marked'
    import store from './store'
    export default{
        data: function() {
            return store;
        },
        beforeCompile: function() {
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
            'viewGist': function(gist) {
                var self = this;
                localStorage.setItem('gistViewed', JSON.stringify(gist));
                self.$set('gist', gist);
                if(!_.isNull(gist.body)) {
                    self.$set('gist.marked', marked(gist.body));
                }
            },
            'showTags': function(tagId) {
                var self = this;
                var gists = self.$get('gists');
                var relatedGist = [];
                _.find(gists, function(o) {
                    _.find(o.gist.tags, function(t) {
                        if(t.id == tagId) {
                            relatedGist.push(o.gist);
                        }
                    });
                });
                console.log(relatedGist);
            }
        }
    }
</script>
