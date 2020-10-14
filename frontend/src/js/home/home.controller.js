class HomeCtrl {
  constructor(AppConstants, tagList, songs, User) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.tagList = tagList;
    this.songs = songs.sort((a,b) => (a.favoritesCount < b.favoritesCount) ? 1 : ((b.favoritesCount < a.favoritesCount) ? -1 : 0));
    this.listConfig = {
      type: User.current ? 'feed': 'all'
    }


  }// end_constructor

}

export default HomeCtrl;
