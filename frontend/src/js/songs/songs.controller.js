class SongsCtrl {
    constructor(songs, $state, $stateParams) {
        "ngInject";

        this.songs = [],
        this.filter = $stateParams.filter;

        if (this.filter) {
            for (let song in songs) {
                if (songs[song].tagList.includes(this.filter)) {
                    this.songs.push(songs[song]);
                }// end_if
            }
        }else {
            this.songs = songs;
        }// end_else

        this.clearFilters = function() {
            this.filter = false;
            this.songs = songs;
        }// end_clearFilters
    }// end_constructor
}// end_SongsCtrl

export default SongsCtrl;