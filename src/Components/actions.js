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
  },
  saveGist (context, params) {
    // disable save
    if(_.isNumber(context.state.newGist.id) === false) {
      // if no id is present we create a new gist.
      $.ajax({
        url: 'http://myapp.local/app_dev.php/api/v1/gists',
        headers: {'authorization': context.state.auth },
        type: 'POST',
        data: params,
      }).done(function (res) {
        context.state.newGist = res
        // dispatch update list.
        // enable save.
        if(params.closeAfterSave) {
          // todo dispatch action to update index
          // todo then redirect the user.
          // close the edit and go to view/:id
          // todo move the following line to the new action.
          context.dispatch('getGists').then( () => {
            context.commit('VIEWGIST', res)
            context.commit('CLOSEEDIT', true)
          })
        }
      });
    } else if(_.isNumber(context.state.newGist.id) === true) {
      // Update the gist.
      $.ajax({
        type: 'POST',
        url: 'http://myapp.local/app_dev.php/api/v1/gists/'+ context.state.newGist.id,
        headers: { 'authorization': context.state.auth },
        data: context.state.newGist,
      }).done(function(res) {
        context.state.newGist = res
        // enable save
        if(params.closeAfterSave) {
          // todo dispatch action to update index
          // todo then redirect the user.
          // close the edit and go to view/:id
          // todo move the following line to the new action.
          context.dispatch('getGists').then( () => {
            context.commit('VIEWGIST', res)
            context.commit('CLOSEEDIT', true)
          })
        }
      });
    }
  },
  viewGist (context, gistId) {
    let result = _.filter(context.state.gists, o => {
      if (o.gist.id == gistId) {
        return o.gist
      }
    })
    if(result.length === 0) {
      context.dispatch('getGists')
    } else {
      context.commit('VIEWGIST', result[0].gist)
    }

  }
}