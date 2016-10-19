import $ from 'jquery'
export default {
  // loginAction.
  loginAction (context, data) {
    $.ajax({
      // TODO put the url in a variable.
      url: 'http://myapp.local/app_dev.php/api/login',
      type: 'POST',
      data: $('.login-form').serialize(),
      timeout: 25000,
      statusCode: {
        401: function (data) {
          self.error = data.responseText;
          self.loading = false;
        },
        404: function (data) {
          self.error = 'Service not found, check your internet connection.';
          self.loading = false;
        }
      }
    }).done(function (res) {
      // self.hash = res.token;
      // self.password = '';
      // self.logged = true;
      // self.loading = false;
      // self.setLocalStorage(res.token, res.username);
      // self.$dispatch('just-logged', res.username);
    }).fail(function (res) {
      // self.error = res.statusText;
      // self.loading = false;
    });
  }

}