class SongsListCtrl {
    constructor($scope, $state) {
        "ngInject";
        
        this._$scope = $scope;
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