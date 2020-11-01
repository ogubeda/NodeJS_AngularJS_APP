class HomeCtrl {
  constructor(AppConstants, tagList, User, $scope, Groups) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.tagList = tagList;
    this._$scope = $scope;
    this.listConfig = {
      type: User.current ? 'feed': 'all',
      filters: {
        order: !User.current ? ["favoritesCount", 'desc']: null,
      }
    }
    this.currentList = Object.assign({}, this.listConfig);

    Groups.query().then(res => console.log(res));
  }// end_constructor 


  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
    this.order = 'favoritesCount';
  }// end_changeList

}

export default HomeCtrl;
