<template>
    <input class="input-sm tags-input form-control" v-model="newTag" v-on:keyup.188.13="addTag()" placeholder="Add new tags..."/>
    <ul class="tags-list list-inline">
        <li class="btn btn-default btn-tag" v-for="tag in gistToEdit.tags">{{ tag.name }} <a @click="removeTag(tag.name)"><i class="fa fa-close"></i></a></li>
    </ul>
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
    import store from '../store';
    import keymaster from 'keymaster'
    export default{
        props: ['newTag'],
        data() {
            return store;
        },
        methods: {
            addTag() {
                // todo trim whitespaces before and after the tag.
                let tag = this.$get('newTag');
                let cleanTag = tag.replace(',', '');
                store.gistToEdit.tags.push({ id: 0, name: cleanTag.trim() });
                this.$set('newTag', '');
            },
            removeTag(name) {
                let array_index = _.findKey(store.gistToEdit.tags, { 'name': name });
                store.gistToEdit.tags.splice(array_index,1);
            }
        }
    }
</script>
