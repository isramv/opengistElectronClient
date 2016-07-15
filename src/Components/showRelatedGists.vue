<template>
    <div v-if="message">
        {{ message }}
    </div>
    <div v-if="showRelatedGists">
        <h3>Related Gists:</h3>
        <ul v-for="gist in relatedGists">
            <li><a v-on:click="viewGist(gist)">{{ gist.title }}</a></li>
        </ul>
    </div>
</template>
<style>
    a {
        cursor: pointer;
    }
</style>
<script>
    import _ from 'lodash'
    export default{
        data () {
            return {
                showRelatedGists: false,
                relatedGists: [],
                message: ''
            }
        },
        events: {
            showRelatedGists (relatedGists) {
                let self = this;
                self.$set('relatedGists', relatedGists);
                self.$set('showRelatedGists', true);
                if(!relatedGists.length) {
                    self.$set('message', 'Not related content.')
                    self.$set('showRelatedGists', false)
                } else {
                    self.$set('message', '');
                }
            },
            clearRelatedGistData () {
                this.$set('showRelatedGists', false);
                this.$set('relatedGists', []);
                this.$set('message','');
            }
        },
        methods: {
            viewGist: function(gist) {
                let self = this;
                self.$dispatch('view-gist', gist);
            }
        }
    }
</script>