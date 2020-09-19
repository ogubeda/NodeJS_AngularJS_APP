function SongsConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.songs', {
            url: '/songs',
            controller: 'SongsCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'songs/songs.html',
            title: 'Songs',
            resolve: {
                songs: function(Songs) {
                    return Songs.getSongs().then(songs => songs);
                }// end_songs
            }// end_resolve
        })// end_app.songs

        .state("app.detailsSongs", {
            url: "/songs/:slug",
            controller: "DetailsSongsCtrl",
            controllerAs: "$ctrl",
            templateUrl: "songs/detailsSongs.html",
            title: "Details Songs",
            resolve: {
                song: function(Songs, $stateParams) {
                    return Songs.getSong($stateParams.slug).then(song => song);
                }// end_song
            }// end_resolve
        })// end_app.detailsSongs
};// end_SongsConfig

export default SongsConfig;