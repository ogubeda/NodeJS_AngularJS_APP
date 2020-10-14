class HomeCtrl {
  constructor(AppConstants, tagList, User, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.tagList = tagList;
    this._$scope = $scope;
    this.listConfig = {
      type: User.current ? 'feed': 'all'
    }
    this.order = "favoritesCount";
  }// end_constructor

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }// end_changeList

}

export default HomeCtrl;
