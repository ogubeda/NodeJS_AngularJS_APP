class SongsCtrl {
    constructor($state, $stateParams) {
        "ngInject";

        this.filter = $stateParams.filter;
        this._$state = $state;
        this.order = "releaseDate";
        this.listConfig = {
            filters: {
                order: ['releaseDate', 'desc'],
              }
        }
        
        this.clearFilters = function() {
            this.filter = false;
            this.songs = songs;
            this._$state.transitionTo('app.songs')

        }// end_clearFilters
    }// end_constructor
}// end_SongsCtrl

export default SongsCtrl;