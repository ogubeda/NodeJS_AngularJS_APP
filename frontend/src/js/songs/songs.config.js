function SongsConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.songs', {
            url: '/songs/:filter',
            controller: 'SongsCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'songs/view/songs.view.html',
            title: 'Songs'
        })
};// end_SongsConfig

export default SongsConfig;