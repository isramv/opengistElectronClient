import $ from 'jquery'
export default {
  // fetches all the gists.
  initializeStore (context) {
      console.log('initializing store')
      return new Promise((resolve, reject) => {
        if(localStorage.getItem('auth') !== null && localStorage.getItem('auth').length > 0) {
          context.commit('AUTH', localStorage.getItem('auth'))
          context.commit('ISAUTH', true)
        } else if(localStorage.getItem('auth') === null) {
          context.commit('AUTH', '')
          context.commit('ISAUTH', false)
        }
        resolve('Initialize completed...')
      })
  },
  getGists (context) {
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
  deleteGist (context, gistId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'DELETE',
        url: 'http://myapp.local/app_dev.php/api/v1/gists/'+ gistId,
        headers: { 'authorization': context.state.auth }
      }).done((res) => {
        if(gistId == res.id) {
          resolve({ message: 'gist deleted', gistId: res.id })
          // todo remove the gist from the index.
          context.dispatch('getGists')
        }
      }).fail((res) => {
        reject({ message: 'gist not deleted'})
      })
    })
  },
  loginAction(context, formInfo) {
    console.log('called from loginAction')
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://myapp.local/app_dev.php/api/login',
        type: 'POST',
        data: formInfo,
        timeout: 25000,
        statusCode: {
          401: function (data) {
            reject('error 401')
          },
          404: function () {
            reject('error 404')
          }
        }
      }).done(function (res) {
        resolve('loggin successful')
        context.commit('USERNAME', res.username)
        context.commit('AUTH', res.token)
        context.commit('ISAUTH', true)
      }).fail(function (res) {
        reject(res)
      })
    })
  }
}