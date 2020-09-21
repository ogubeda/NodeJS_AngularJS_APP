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
};// end_SongsConfig

export default SongsConfig;