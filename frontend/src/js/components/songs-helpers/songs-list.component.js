class SongsListCtrl {
    constructor($scope, $state) {
        "ngInject";
        
        this._$scope = $scope;

        this.openDetails = function(slug) {
            $state.go("app.details", {slug: slug});
        }
    }// end_constructor
}// end_EventsListCtrl

let SongsList = {
    bindings: {
        songs: "="
    },
    controller: SongsListCtrl,
    templateUrl: 'components/songs-helpers/songs-list.html'
};// end_SongsList

export default SongsList;