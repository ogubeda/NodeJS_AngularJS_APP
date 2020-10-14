class SongsListCtrl {
    constructor($state, Songs, $scope) {
        "ngInject";

        this.$onInit = () => {
            this._Songs = Songs;
            this.setListTo(this.listConfig);
            this.order = this.order || 'title';
    
            $scope.$on('setListTo', (ev, newList) => {
                this.setListTo(newList);
            });
    
            $scope.$on('setPageTo', (ev, pageNumber) => {
                this.setPageTo(pageNumber);
            });
    
            this.openDetails = function (slug) {
                $state.go("app.details", { slug: slug });
            }// end_openDetails
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

        queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));

        this._Songs.query(queryConfig).then((res) => {
            this.loading = false;
            this.list = res.songs.sort((a,b) => (a[this.order] < b[this.order]) ? 1 : ((b[this.order] < a[this.order]) ? -1 : 0));
            this.listConfig.totalPages = Math.ceil(res.songsCount / this.limit);
        });
        
    }
}// end_EventsListCtrl

let SongsList = {
    bindings: {
        limit: "=",
        listConfig: "=",
        order: "="
    },
    controller: SongsListCtrl,
    templateUrl: 'components/songs-helpers/songs-list.html'
};// end_SongsList

export default SongsList;