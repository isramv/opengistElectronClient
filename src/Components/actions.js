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
      let gists = JSON.stringify(res)
      context.commit('GISTS', gists)
    });
  }

}