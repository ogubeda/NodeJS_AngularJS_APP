class HomeCtrl {
  constructor(AppConstants, tagList, User) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.tagList = tagList;
    this.listConfig = {
      type: User.current ? 'feed': 'all'
    }
    this.order = "favoritesCount";


  }// end_constructor

}

export default HomeCtrl;
