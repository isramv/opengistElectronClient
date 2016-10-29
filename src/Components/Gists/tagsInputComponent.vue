<template>
    <div>
      <input class="input-sm tags-input form-control" placeholder="Add new tags..." v-on:keyup.188.13="addTag($event)">
        <ul class="tags-list list-inline">
            <li class="btn btn-default btn-tag" v-for="tag in tags">{{ tag.name }} <a @click="removeTag(tag.name)"><i class="fa fa-close"></i></a></li>
        </ul>
    </div>
</template>
<style lang="sass" xml:lang="scss" scoped>
    ul {
        li {
            margin-right: 4px;
        }
    }
    .tags-list {
        margin: 0;
    }
    .tags-input {
        width: 240px;
        margin: 10px 0;
    }
    .btn-tag {
        background: #d3d4de;
        color: #585469;
    }
</style>
<script>
  export default{
    computed: {
      tags () {
        return this.$store.state.newGist.tags
      }
    },
    methods: {
      addTag(e) {
        let tagValue = e.target.value.trim()
        if(tagValue.length > 0) {
          this.$store.commit('NEWGISTTAG', tagValue.replace(',', ''))
          e.target.value = ''
        }
      },
      removeTag(name) {
        let array_index = _.findKey(this.$store.state.newGist.tags, { 'name': name });
        this.$store.state.newGist.tags.splice(array_index,1);
      }
      // todo create a @input attribute and method to add tag with double space.
    }
  }
</script>
