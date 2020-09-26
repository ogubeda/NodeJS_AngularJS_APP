class SocialCtrl {
  constructor(User, $state, Toastr) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this._toastr = Toastr;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

    this._User.attemptAuth(this.authType, null).then(
      (res) => {
        location.reload();
        this._$state.go('app.home');
        this._toastr.showToastr('success', 'Successfully Logged In');
      },
      (err) => {
        this._toastr.showToastr('error', 'Error trying to login');
        this._$state.go('app.home');
      }
    )
  }
}

export default SocialCtrl;