<template>
  <div>
    <div>
      <div class="form-group">
        <input class="title form-control" :value="title" @input="updateTitle"></input>
      </div>
      <div class="form-group">
        <button class="btn btn-default btn-sm" @click="cancelAction">Cancel</button>
        <button class="btn btn-default btn-sm" @click="saveAction()">Save</button>
        <button class="btn btn-default btn-sm" @click="saveAndCloseAction()">Save And Close</button>
      </div>
      <div class="form-group">
        <tags-input-component></tags-input-component>
      </div>
      <div class="form-group editor-container">
        <div id="editor" @input="updateBody"></div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" xml:lang="scss">
    input {
        &.title.form-control {
            max-width: 300px;
        }
    }
    .editor-container {
        min-height: 600px;
    }
    #editor {
        position: absolute;
        width: 90%;
        height: 600px;
        padding-right: 40px;
        border: 1px solid #d4d4d4;
    }
    input {
      &.title.form-control {
        max-width: 300px;
      }
    }
    .editor-container {
      min-height: 600px;
    }
    #editor {
      width: 650px;
      height: 600px;
      padding-right: 40px;
      border: 1px solid #d4d4d4;
    }
</style>
<script>
  import store from '../vuex_store'
  import 'jquery'
  import _ from 'lodash'
  import ace from 'brace'
  require('brace/mode/markdown');
  require('brace/theme/github');
  import tagsInputComponent from './tagsInputComponent.vue';
  export default {
     components: {
      'tags-input-component': tagsInputComponent
    },
    computed: {
      isNewGist() {
        return this.$store.getters.isNewGist
      },
      gistId() {
        return this.$store.state.newGist.id
      },
      newGist () {
        return this.$store.state.newGist
      },
      title () {
        return this.newGist.title
      },
      body () {
        return this.newGist.body
      },
      closeEdit() {
          return this.$store.state.closeEdit
      }
    },
    watch: {
        gistId: function(val) {
            if(val === '') {
              ace.edit("editor").setValue('', 1);
              this.$store.commit('NEWGISTBODY', '')
            }
        },
        closeEdit: function(val) {
          if(val) {
            this.$store.commit('CLOSEEDITFALSE')
            this.$router.push({ name: 'viewGist', params: {id: this.$store.state.newGist.id}})
          }
        }
    },
    beforeRouteEnter (to, from, next) {
      if(to.name === 'newGist') {
        store.commit('NEWGISTRESET')
        next()
      } else {
        next()
      }
      next()
    },
    beforeRouteLeave (to, from, next) {
      next()
    },
    mounted () {
      let self = this
      const editor = ace.edit('editor');
      editor.setOption("wrap", 80);
      editor.getSession().setMode('ace/mode/markdown');
      editor.setTheme('ace/theme/github');
      editor.$blockScrolling = Infinity
      editor.commands.addCommand({
        name: 'savegist',
        bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
        exec: function (editor) {
          console.log('save while editing')
          self.saveAction()
        }
      });
      editor.commands.addCommand({
        name: 'cancel',
        bindKey: {win: 'Ctrl-P', mac: 'Command-P'},
        exec: function (editor) {
          console.log('cancel')
        }
      });
      editor.setValue(this.body, 1);
    },
    methods: {
      updateTitle(e) {
        this.$store.commit('NEWGISTTITLE', e.target.value)
      },
      updateBody() {
        this.$store.commit('NEWGISTBODY', ace.edit("editor").getValue())
      },
      saveAction() {
        this.updateBody()
        let gistToSave = this.$store.state.newGist
        this.$store.dispatch('saveGist', gistToSave)
      },
      saveAndCloseAction() {
        this.$store.commit('NEWGISTBODY', ace.edit("editor").getValue())
        let gistToSave = this.$store.state.newGist
        gistToSave.closeAfterSave = true
        this.$store.dispatch('saveGist', gistToSave)
      },
      cancelAction() {
        if(this.$store.state.newGist.id !== '') {
          this.$router.push({ name: 'viewGist', params : { id: this.$store.state.newGist.id } });
        }
      }
    }
  }
</script>
