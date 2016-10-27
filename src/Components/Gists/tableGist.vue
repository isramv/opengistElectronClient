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
    beforeCreate() {
      if (localStorage.getItem('GISTS') === null) {
        this.$store.dispatch('getGists')
      } else {
        this.$store.commit('GISTS', JSON.parse(localStorage.getItem('GISTS')))
      }
    },
    methods: {
      showGist(gist) {
        //this.$dispatch('view-gist', gist);
      }
    }
  }
</script>
