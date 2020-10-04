class SongsCtrl {
    constructor(songs, $state, $stateParams) {
        "ngInject";

        this.songs = [],
        this.filter = $stateParams.filter;
        this._$state = $state;

        console.log(songs);

        songs.sort((a,b) => (a.releaseDate < b.releaseDate) ? 1 : ((b.releaseDate < a.releaseDate) ? -1 : 0));

        if (this.filter) {
            for (let song in songs) {
                if (songs[song].tagList.includes(this.filter)) {
                    this.songs.push(songs[song]);
                }// end_if
            }// end_for
        }else {
            this.songs = songs;
        }// end_else

        this.clearFilters = function() {
            this.filter = false;
            this.songs = songs;
            this._$state.transitionTo('app.songs')

        }// end_clearFilters
    }// end_constructor
}// end_SongsCtrl

export default SongsCtrl;