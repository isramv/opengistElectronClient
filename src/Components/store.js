// @todo move the logic in this object to vuex.
var store =  {
    gists: [],
    auth: '',
    username: '',
    gist: {},
    editing: false,
    gistToEdit: {},
    state: 'view',
    editornew: {}
};
export default store