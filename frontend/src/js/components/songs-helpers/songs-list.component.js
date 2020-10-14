class SongsListCtrl {
    constructor($state, Songs, $scope) {
        "ngInject";

        this._Songs = Songs;
        this.setListTo(this.listConfig);

        $scope.$on('setListTo', (ev, newList) => {
            this.setListTo(newList);
        });

        $scope.$on('setPageTo', (ev, pageNumber) => {
            this.setPageTo(pageNumber);
        });

        this.openDetails = function (slug) {
            $state.go("app.details", { slug: slug });
        }// end_openDetails

        this.$onInit = () => {
            console.log(this.listConfig);
        }
    }// end_constructor

    setListTo(newList) {
        this.list = [];
        this.listConfig = newList;
        this.runQuery();
    }// end_setListTo

    setPageTo(pageNumber) {
        this.listConfig.currentPage = pageNumber;
        this.runQuery();
    }// end_setPageTo

    runQuery() {
        this.loading = true;
        this.listConfig = this.listConfig || {};

        let queryConfig = {
            type: this.listConfig.type || undefined,
            filters: this.listConfig.filters || {}
        }// end_queryConfig

        queryConfig.filters.limit = this.limit;

        if (!this.listConfig.currentPage) {
            this.listConfig.currentPage = 1;
        }// end_if

        
    }
}// end_EventsListCtrl

let SongsList = {
    bindings: {
        songs: "=",
        limit: "=",
        listConfig: "="
    },
    controller: SongsListCtrl,
    templateUrl: 'components/songs-helpers/songs-list.html'
};// end_SongsList

export default SongsList;