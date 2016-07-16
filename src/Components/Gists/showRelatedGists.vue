<template>
    <div v-if="message">
        {{ message }}
    </div>
    <div v-if="showRelatedGists">
        <h3>Related Gists:</h3>
        <ul class="list-unstyled-rc">
            <li v-for="gist in relatedGists"><a class="btn btn-default btn-xs" v-on:click="viewGist(gist)">{{ gist.title }}</a></li>
        </ul>
    </div>
</template>
<style lang="sass" xml:lang="scss">
    .list-unstyled-rc {
        padding-left: 16px;
        li {
            margin-bottom: 5px;
        }
    }
    a {
        cursor: pointer;
    }
</style>
<script>
    import _ from 'lodash'
    export default{
        data() {
            return {
                showRelatedGists: false,
                relatedGists: [],
                message: ''
            }
        },
        events: {
            'show-related-gists': function (relatedGists) {
                this.showRelatedGistsAction(relatedGists);
            },
            'clear-data': function() {
                this.clearRelatedGistData();
            },
            'edit-gist': function() {
                this.clearRelatedGistData();
            }
        },
        methods: {
            viewGist(gist) {
                let self = this;
                self.$dispatch('view-gist', gist);
            },
            clearRelatedGistData() {
                this.$set('showRelatedGists', false);
                this.$set('relatedGists', []);
                this.$set('message','');
            },
            showRelatedGistsAction(relatedGists) {
                let self = this;
                self.$set('relatedGists', relatedGists);
                self.$set('showRelatedGists', true);
                if(!relatedGists.length) {
                    self.$set('message', 'Not related content.')
                    self.$set('showRelatedGists', false)
                } else {
                    self.$set('message', '');
                }
            }
        }
    }
</script>