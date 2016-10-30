<template>
    <!-- todo migrate this. -->
    <div>
        <div class="row actions">
            <div class="col-xs-4 col-xs-offset-8">
                <!-- todo fix the cancel button. -->
                <!--<button class="btn-sm btn btn-default btn-sm" v-on:click="cancelAction">Cancel</button>-->
                <!--<button class="btn-sm btn btn-default btn-sm" v-on:click="createAction">Save</button>-->
            </div>
        </div>
        <!--<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="processing"></i>-->
        <div>
            <!--<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="saving"></i>-->
            {{ closeEdit }}
            <div class="form-group">
                <input class="title form-control" :value="title" @input="updateTitle"></input>
            </div>
            <div class="form-group">
                <tags-input-component></tags-input-component>
            </div>
            <!--<div class="form-group editor-container" v-if="!processing">-->
            <div class="form-group editor-container">
                <div id="editor" @input="updateBody"></div>
            </div>
            <br/>
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
    .select2-select {

    }
</style>
<script>
  import store from '../store'
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
        closeEdit: function(val, oldVal) {
          if(val) {
            let route = '/gistapp/view/' + this.$store.state.newGist.id
            this.$router.push(route)
          }
        }
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
      updateBody(e) {
        this.$store.commit('NEWGISTBODY', ace.edit("editor").getValue())
      },
      saveAction() {
        let gistToSave = this.$store.state.newGist
        this.$store.dispatch('saveGist', gistToSave)
      },
      saveAndCloseAction() {
        let gistToSave = this.$store.state.newGist
        gistToSave.closeAfterSave = true
        console.log('save and close action')
        this.$store.dispatch('saveGist', gistToSave)
      }
    }
  }
</script>
