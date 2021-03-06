class HomeCtrl {
  constructor(AppConstants, tagList, User, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.tagList = tagList;
    this._$scope = $scope;
    this.listConfigGroups = {
      order: 'favoritesCount'
    }
    this.listConfig = {
      type: User.current ? 'feed': 'all',
      filters: {
        order: !User.current ? ["favoritesCount", 'desc']: null,
      }
    }
    this.currentList = Object.assign({}, this.listConfig);
  }// end_constructor 


  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
    this.order = 'favoritesCount';
  }// end_changeList

}

export default HomeCtrl;
