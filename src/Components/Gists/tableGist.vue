<template>
  <div>
    <input class="form-control table-filter" type="text" @input="searchTitle($event)" placeholder="Filter table">
    <table class="table table-condensed bg-table-base">
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
<style lang="sass" xml:lang="scss">
  table.bg-table-base {
    margin-top: 15px;
    tr {
      td {
        padding: 3px 5px;
        .router-link-active {
          text-decorarion: none;
          font-weight: bold;
          color: #2e2e2e;
        }
      }
    }
    border: 0;
    tr:nth-child(odd) {
      background: #f1f1f1;
    }
    tr:nth-child(even) {
      background: #fafafa;
    }
    tbody {
      > tr {
        > td {
          padding: 5px;
          border-top: 0 !important;
          a {
            color: #464646;
          }
        }
      }
    }
  }
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
        } else {
            return null
        }
      },
      gists() {
        return this.$store.state.gists;
      }
    },
    created() {
      console.log('created')
      if(_.isEmpty(JSON.parse(localStorage.getItem('GISTS'))) || localStorage.getItem('GISTS') === null) {
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
