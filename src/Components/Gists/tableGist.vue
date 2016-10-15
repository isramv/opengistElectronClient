<template>
    <div>
        <input class="form-control table-filter" type="text" v-model="searchTitle" placeholder="Filter table">
        {{ title }}
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
    import store from '../store'
    export default{
        props: ['searchTitle'],
        data(){
            return store
        },
        methods: {
            showGist(gist) {
                this.$dispatch('view-gist', gist);
            }
        }
    }
</script>
