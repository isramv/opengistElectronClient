<template>
    <div>
        <div v-if="relatedGists">
            <h3>Related Gists:</h3>
            <ul class="list-unstyled-rc">
                <li v-for="gist in relatedGists">
                  <router-link class="btn btn-default btn-xs" :to="{ name: 'viewGist', params: { id: gist.id } }">
                    {{ gist.title }}
                  </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="sass" xml:lang="scss">
    .list-unstyled-rc {
        padding-left: 0;
        li {
            margin-bottom: 5px;
            list-style: none;
        }
    }
    a {
        cursor: pointer;
    }
</style>
<script>
    import _ from 'lodash'
    export default{
        computed: {
            relatedGists () {
                return this.$store.state.relatedGists
            }
        }
    }
</script>