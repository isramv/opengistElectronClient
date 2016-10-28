import $ from 'jquery'
export default {
  // fetches all the gists.
  getGists (context) {
    // @todo create a message system for ajax operations.
    $.ajax({
      url: 'http://myapp.local/app_dev.php/api/v1/gists',
      headers: { 'authorization': context.state.auth },
      type: 'GET'
    }).done(function(res) {
      context.commit('GISTS', res)
    });
  },
  // show the gist also tagged with
  // params is an object with the following structure
  // { tagId: n, gistId: n}
  showRelatedGists(context, params) {
    let relatedGist = []
    _.find(context.state.gists, function (o) {
      _.find(o.gist.tags, function (t) {
        if (t.id == params.tagId) {
          // Don't show the current gist.
          if (o.gist.id !== params.gistId) {
            relatedGist.push(o.gist);
          }
        }
      });
    });
    if(relatedGist.length > 0) {
      context.commit('RELATEDGISTS', relatedGist)
    } else {
      context.commit('RELATEDGISTS', null)
    }
  }
}