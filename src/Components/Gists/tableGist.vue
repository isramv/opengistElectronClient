<template>
    <div>
        <input class="form-control table-filter" type="text" @input="searchTitle($event)" placeholder="Filter table">
        <table class="table table-condensed">
            <!-- @todo fix this filter. -->
            <!--<tr v-for="gist in gists | filterBy searchTitle">-->
            <tr v-for="gist in gists">
                <td>
                  <router-link :to="{ name: 'viewGist', params: { id: gist.gist.id } }">{{ gist.gist.title }}</router-link>
                </td>
            </tr>
        </table>
    </div>
</template>
<style>
</style>
<script>
  export default{
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
        searchTitle(e) {
            console.log(e.target.value)
        }
    }
  }
</script>
