import $ from 'jquery'
export default {
  // fetches all the gists.
  getGists (context, data) {
    $.ajax({
      url: 'http://myapp.local/app_dev.php/api/v1/gists',
      headers: { 'authorization': context.state.auth },
      type: 'GET'
    }).done(function(res) {
//                    self.$set('gists', res);
//                    self.$get('gists');
//                    localStorage.setItem('gists', JSON.stringify(res));
    });
  }

}