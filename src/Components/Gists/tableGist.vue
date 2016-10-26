<template>
    <div>
        <input class="form-control table-filter" type="text" v-model="searchTitle" placeholder="Filter table">
        <table class="table table-condensed">
            <!-- @todo fix this filter. -->
            <!--<tr v-for="gist in gists | filterBy searchTitle">-->
            <tr v-for="gist in gists">
                <td><a class="table-component_link" v-on:click="showGist(gist.gist)">{{ gist.gist.title }}</a></td>
            </tr>
        </table>
    </div>
</template>
<style>
</style>
<script>
    export default{
        props: ['searchTitle'],
        computed: {
            gists() {
                return this.$store.state.gists;
            }
        },
        created () {
            if(this.gists.length === 0) {
                this.$store.dispatch('getGists')
            }
        },
        methods: {
            showGist(gist) {
                console.log(gist)
//                this.$dispatch('view-gist', gist);
            }
        }
    }
</script>
