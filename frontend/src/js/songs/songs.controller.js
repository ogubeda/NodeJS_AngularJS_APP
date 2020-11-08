class SongsCtrl {
    constructor($state, $stateParams) {
        "ngInject";
        
        this.filter = $stateParams.filter;

        this._$state = $state;
        this.order = "releaseDate";
        this.listConfig = {
            filters: {
                order: ['releaseDate', 'desc'],
                group: $stateParams.filter
              }
        }
        
        this.clearFilters = function() {
            this.listConfig = {
                filters: {
                    order: ['releaseDate', 'desc'],
                  }
            }
            this._$state.transitionTo('app.songs')

        }// end_clearFilters
    }// end_constructor
}// end_SongsCtrl

export default SongsCtrl;