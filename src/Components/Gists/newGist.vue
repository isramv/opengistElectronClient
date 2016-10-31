<template>
    <div>
        <div class="row actions">
            <div class="col-xs-4 col-xs-offset-8">
            </div>
        </div>
        <div>
            <div class="form-group">
                <input class="title form-control" :value="title" @input="updateTitle"></input>
            </div>
            <div class="form-group">
                <tags-input-component></tags-input-component>
            </div>
            <div class="form-group editor-container">
                <div id="editor" @input="updateBody"></div>
            </div>
            <br/>
            <div class="form-group">
                <button class="btn btn-default" @click="cancelAction">Cancel</button>
            </div>
            <div class="form-group">
                <button class="btn btn-default" @click="saveAction()">Save</button>
            </div>
            <div class="form-group">
                <button class="btn btn-default" @click="saveAndCloseAction()">Save And Close</button>
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
        closeEdit: function(val) {
          if(val) {
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
      // console.log(store.state)
      // console.log('// enter to //')
      // console.log(to)
      // console.log('// enter from //')
      // console.log(from)
      next()
    },
    beforeRouteLeave (to, from, next) {
      // update the viewGist action.
      // console.log('// leaving to //')
      // console.log(to)
      // console.log('// entering from //')
      // console.log(from)
      next()
    },
    mounted () {
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
