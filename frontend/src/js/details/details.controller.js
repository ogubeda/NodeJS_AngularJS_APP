class DetailsCtrl {
    constructor(song, comments, $state, $scope, $stateParams) {
        "ngInject";
        
        this._$scope = $scope;
        this.song = song;
        console.log(this.song);
        console.log(comments);

    }// end_constructor
}// end_DetailsSongsCtrl

export default DetailsCtrl;