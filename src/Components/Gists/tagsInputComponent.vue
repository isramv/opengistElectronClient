<template>
    <div>
      <ul class="tags-list list-inline">
        <li class="btn btn-default btn-tag btn-sm"
            v-bind:class="[ indexSelected === index ? 'selected' : '' ]"
            v-for="(tag, index) in tags">{{ tag.name }}<a @click="removeTag(tag.name)">
          <i class="fa fa-close"></i></a></li>
        <li>
          <input class="input-add-tag"
                   placeholder="Add new tags..."
                   v-on:keyup.27="resetIndex()"
                   v-on:keyup.37="highlightPreviousTag($event)"
                   v-on:keyup.39="highlightNextTag($event)"
                   v-on:keyup.8="deleteSelectedTag($event)"
                   v-on:keyup.188.13="addTag($event)">
        </li>
      </ul>
    </div>
</template>
<style lang="sass" xml:lang="scss" scoped>
    ul {
        li {
            margin-right: 4px;
          &.selected {
            border: 1px solid red;
            background: #ff7892;
          }
        }
    }
    .tags-list {
      width: 300px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 4px;
      padding: 5px 5px;
      margin: 0;
    }
    .input-add-tag {
      border: 0;
    }
    .tags-input {
        width: 240px;
        margin: 10px 0;
    }
    .btn-tag {
        background: #d3d4de;
        color: #585469;
        margin: 2px;
    }
</style>
<script>
  import $ from 'jquery'
  export default{
    data() {
      return {
        indexSelected: null
      }
    },
    computed: {
      tags () {
        return this.$store.state.newGist.tags
      }
    },
    methods: {
      addTag(e) {
        let tagValue = e.target.value.trim()
        if(tagValue.length > 0 && tagValue !==',') {
          this.$store.commit('NEWGISTTAG', tagValue.replace(',', ''))
          e.target.value = ''
        }
      },
      removeTag(name) {
        let array_index = _.findKey(this.$store.state.newGist.tags, { 'name': name });
        this.$store.state.newGist.tags.splice(array_index,1);
      },
      highlightPreviousTag(e) {
        if(this.tags.length > 0) {
          if(this.indexSelected === null) {
            return this.indexSelected = this.tags.length - 1
          }
          if(this.indexSelected === 0) {
            return this.indexSelected = this.tags.length - 1
          }
          --this.indexSelected
        }
      },
      highlightNextTag(e) {
        let tagsIndex = this.tags.length - 1
        if(this.tags.length > 0) {
          if(tagsIndex <= this.indexSelected) {
            return this.indexSelected = null
          }
          ++this.indexSelected
        }
      },
      deleteSelectedTag() {
        if(typeof this.tags[this.indexSelected] !== 'undefined') {
          this.removeTag(this.tags[this.indexSelected].name)
        }
      },
      resetIndex() {
        this.indexSelected = null
      }
      // todo create a @input attribute and method to add tag with double space.
    }
  }
</script>
