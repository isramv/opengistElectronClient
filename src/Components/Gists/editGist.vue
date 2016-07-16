<template>
    <div v-if="editing">
        <h1 class="gist-title">Edit Gist.</h1>
        <div class="row actions">
            <div class="col-xs-4 col-xs-offset-8">
                <button class="btn btn-default btn-sm" v-on:click="finishEditing">Done</button>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import store from '../store'
    export default{
        data() {
            return store
        },
        events: {
            'edit-gist': function() {
                let self = this;
                self.$set('editing', true);
            }
        },
        methods: {
            finishEditing() {
                // TODO discard not made changes.
                this.$set('editing', false);
            }
        }

    }
</script>
