<template>
    <div v-if="editing">
        <div class="row actions">
            <div class="col-xs-4 col-xs-offset-8">
                <button class="btn btn-default btn-sm" v-on:click="finishEditing">Done</button>
            </div>
        </div>
        <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="processing"></i>
        <form>
            <div class="form-group">
                <input class="form-control" v-model="gistToEdit.title"></input>
            </div>
            <div class="form-group">
                <textarea class="form-control" v-model="gistToEdit.body" debounce="300"></textarea>
            </div>
        </form>
    </div>

</template>
<style>

</style>
<script>
    import store from '../store'
    import $ from 'jquery'
    export default{
        props: ['processing'],
        data() {
            return store
        },
        events: {
            'edit-gist': function(gistId) {
                let self = this;
                self.getUpdatedGist(gistId);
                this.$set('editing', true);
            }
        },
        methods: {
            finishEditing() {
                // TODO discard not made changes.
                this.$set('editing', false);
            },
            getUpdatedGist(gistId) {
                let self = this;
                self.$set('processing', true);
                $.ajax({
                    // TODO update the url and put.
                    url: 'http://myapp.local/app_dev.php/api/v1/gists/'+ gistId,
                    headers: { 'authorization': localStorage.getItem('Authorization') },
                    type: 'GET'
                }).done(function(res) {
                    self.$set('gistToEdit', res);
                    self.$set('processing', false);
                });
            }
        }

    }
</script>
