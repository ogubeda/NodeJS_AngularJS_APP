class DetailsCtrl {
    constructor(song, $state, $scope, $stateParams) {
        "ngInject";
        
        this._$scope = $scope;
        this.song = song;
        console.log(this.song);

    }// end_constructor
}// end_DetailsSongsCtrl

export default DetailsCtrl;