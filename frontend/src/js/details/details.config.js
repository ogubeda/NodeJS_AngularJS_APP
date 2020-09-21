function DetailsSongsConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.details', {
            url: '/songs/:slug',
            controller: 'DetailsCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'details/view/details.html',
            title: 'Details Songs',
            resolve: {
                song: function(Songs, $stateParams) {
                    return Songs.getSong($stateParams.slug).then(song => song);
                }
            }
        })
}

export default DetailsSongsConfig;