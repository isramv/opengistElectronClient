<template>
    <div>
        <input class="form-control table-filter" type="text" @input="searchTitle($event)" placeholder="Filter table">
        <table class="table table-condensed">
            <!--{{ filteredGists }}-->
            <!-- @todo fix this filter. -->
            <!--<tr v-for="gist in gists | filterBy searchTitle">-->
            <tr v-for="gist in filteredGists">
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
    data() {
      return {
        searchString: ''
      }
    },
    computed: {
      filteredGists() {
        if(this.$store.state.gists.filter) {
          return this.$store.state.gists.filter((e) => {
            let searchRegex = new RegExp(this.$data.searchString, 'i')
            if(searchRegex.test(e.gist.title)) {
              return true
            }
          })
        }

      },
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
            this.$data.searchString = e.target.value
        }
    }
  }
</script>
