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
      context.commit('UPDATELOCALSTORAGE')
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
        context.dispatch('insertInLocalGistsList', res)
        if(params.closeAfterSave) {
          context.commit('CLOSEEDIT', true)
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
        context.dispatch('updateInLocalGistsList', res)
        if(params.closeAfterSave) {
            context.commit('CLOSEEDIT', true)
        }
      });
    }
  },
  // update local list of gists is newly saved
  updateInLocalGistsList (context, gistObject) {
    let index = _.findIndex(context.state.gists, (o) => {
      return o.gist.id === gistObject.id
    })
    context.state.gists[index] = { gist: gistObject }
    context.commit('UPDATELOCALSTORAGE')
  },
  // insert in local list of gists if gist updated
  insertInLocalGistsList (context, gistObject) {
    context.state.gists.unshift({ gist: gistObject })
    context.commit('UPDATELOCALSTORAGE')
  },
  viewGist (context, gistId) {
    return new Promise((resolve, reject) => {
      let result = _.findIndex(context.state.gists, o => {
        if (o.gist.id == gistId) {
          return o.gist
        }
      })
      if(result === -1) {
        reject('index not found')
      } else {
        context.commit('VIEWGIST', context.state.gists[result])
        resolve('found')
      }
    })
  },
  getOneGistToEdit (context, gistId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://myapp.local/app_dev.php/api/v1/gists/' + gistId,
        headers: {'authorization': context.state.auth},
        type: 'GET',
        dataType: 'json'
      }).done(function (res) {
        context.commit('SETNEWGIST', res)
        resolve('success')
      })
    })
  }
}