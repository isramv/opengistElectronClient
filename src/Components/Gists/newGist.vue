<template>
    <div>
        <div class="row actions">
            <div class="col-xs-4 col-xs-offset-8">
                <!-- todo fix the cancel button. -->
                <button class="btn-sm btn btn-default btn-sm" v-on:click="cancelAction">Cancel</button>
                <button class="btn-sm btn btn-default btn-sm" v-on:click="createAction">Save</button>
            </div>
        </div>
        <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="processing"></i>
        <div>
            <div class="form-group">
                <input class="title form-control" v-model="gistToEdit.title"></input>
            </div>
            <div class="form-group">
                <tags-input-component></tags-input-component>
            </div>
            <div class="form-group editor-container">
                <div id="editor"></div>
            </div>
            <br/>
            <div class="form-group">
                <button class="btn btn-default" @click="createAction()">Save</button>
            </div>
        </div>
    </div>
</template>
<style lang="sass" xml:lang="scss" scoped>
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
    export default{
        props: ['processing', 'editor'],
        data() {
            return store
        },
        components: {
            'tags-input-component': tagsInputComponent
        },
        events: {
            'new-gist': function() {
                let self = this;
                self.newGist();
            }
        },
        methods: {
            newGist() {
                let newGist = {
                    title: '',
                    body: '',
                    tags: []
                };
                setTimeout(function() {
                    let editor = ace.edit('editor');
                    editor.setValue('',1);
                    editor.getSession().setMode('ace/mode/markdown');
                    editor.setTheme('ace/theme/github');
                }, 1000);

            },
            cancelAction() {

            },
            createAction() {

            }
            // Todo save method.
        }
    }
</script>
