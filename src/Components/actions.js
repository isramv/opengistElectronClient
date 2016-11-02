import $ from 'jquery'
export default {
  // fetches all the gists.
  getGists (context) {
    if(localStorage.getItem('auth') !== null) {
      context.commit('AUTH', localStorage.getItem('auth'))
    }
    context.commit('LOADING', { status: true, message: 'updating all the gists'})
    $.ajax({
      url: 'http://myapp.local/app_dev.php/api/v1/gists',
      headers: { 'authorization': context.state.auth },
      type: 'GET'
    }).done(function(res) {
      context.commit('GISTS', res)
      context.commit('UPDATELOCALSTORAGE')
      context.commit('LOADING', { status: false, message: ''})
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
    if(localStorage.getItem('auth') !== null) {
      context.commit('AUTH', localStorage.getItem('auth'))
    }
    // disable save
    if(_.isNumber(context.state.newGist.id) === false) {
      context.commit('LOADING', { status: true, message: 'saving gist'})
      // if no id is present we create a new gist.
      $.ajax({
        url: 'http://myapp.local/app_dev.php/api/v1/gists',
        headers: {'authorization': context.state.auth },
        type: 'POST',
        data: params,
      }).done(function (res) {
        context.commit('LOADING', { status: false, message: ''})
        context.state.newGist = res
        // dispatch update list.
        context.dispatch('insertInLocalGistsList', res)
        if(params.closeAfterSave) {
          context.commit('CLOSEEDIT', true)
        }
      });
    } else if(_.isNumber(context.state.newGist.id) === true) {
      context.commit('LOADING', { status: true, message: 'updating gist'})
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
        context.commit('LOADING', { status: false, message: ''})
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
      context.commit('LOADING', { status: true, message: 'loading gist'})
      let result = _.findIndex(context.state.gists, o => {
        if (o.gist.id == gistId) {
          return o.gist
        }
      })
      if(result !== -1) {
        context.commit('VIEWGIST', context.state.gists[result])
        context.commit('LOADING', { status: false, message: ''})
        resolve('found')
      } else {
        context.commit('LOADING', { status: false, message: ''})
        reject('index not found')
      }
    })
  },
  getOneGistToEdit (context, gistId) {
    return new Promise((resolve, reject) => {
      if(localStorage.getItem('auth') !== null) {
        context.commit('AUTH', localStorage.getItem('auth'))
      }
      context.commit('LOADING', { status: true, message: 'loading gist'})
      $.ajax({
        url: 'http://myapp.local/app_dev.php/api/v1/gists/' + gistId,
        headers: {'authorization': context.state.auth},
        type: 'GET',
        dataType: 'json'
      }).done(function (res) {
        context.commit('SETNEWGIST', res)
        context.commit('LOADING', { status: false, message: ''})
        resolve('success')
      })
    })
  },
  logoutAction() {
    // todo create a new promise.
  }
}