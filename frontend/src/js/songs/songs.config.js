function SongsConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.songs', {
            url: '/songs',
            controller: 'SongsCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'songs/view/songs.view.html',
            title: 'Songs',
            resolve: {
                songs: function(Songs) {
                    return Songs.getSongs().then(songs => songs);
                }
            }
        })

        .state('app.detailsSongs', {
            url: '/songs/:slug',
            controller: 'DetailsSongsCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'songs/view/detailsSongs.html',
            title: 'Details Songs',
            resolve: {
                song: function(Songs, $stateParams) {
                    return Songs.getSong($stateParams.slug).then(song => song);
                }
            }
        })
};// end_SongsConfig

export default SongsConfig;