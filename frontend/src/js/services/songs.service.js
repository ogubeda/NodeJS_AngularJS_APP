export default class Songs {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
    }

    getSongs() {
      return this.$http({
        url: this._AppConstants.api + "/songs/",
        method: "GET"
      }).then(res => {
        return res.data.songs;
      });
    }// end_getSongs

    getSong(slug) {
      return this._$http({
        url: this._AppConstants.api + "/songs/" + slug,
        method: "GET"
      }).then(res => res.data.song);
    }//end_getSong

    addFav(slug) {
      return this._$http({
        url: this.AppConstants.api + "/songs/" + slug + "/favorite",
        method: "POST"
      });
    }// end_addFav

    delFav(slug) {
      return this._$http({
        url: this._AppConstants.api + "/songs/" + slug + "/favorite",
        method: "DELETE"
      });
    }// end_delFav
}