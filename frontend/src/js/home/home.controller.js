class HomeCtrl {
  constructor(AppConstants, $scope, songs) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.songs = songs;
  }
}

export default HomeCtrl;
