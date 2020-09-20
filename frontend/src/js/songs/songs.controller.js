class SongsCtrl {
    constructor(songs, $state, $scope, $stateParams) {
        "ngInject";

        this._$scope = $scope,
        this.songs = songs,
        console.log(songs[1].id);
        this.filter = $stateParams.filter;

        this._$scope.showDetails = function() {
            console.log('miau');
            // $state.go("app.detailsSongs", {slug: this.hotel["slug"]});
        }// end_showDetails
    }// end_constructor
}// end_SongsCtrl

export default SongsCtrl;