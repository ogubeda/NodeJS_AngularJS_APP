import angular from 'angular';

let songsModule = angular.module('app.songs',[]);

import SongsConfig from './songs.config';
songsModule.config(SongsConfig);

import SongsCtrl from './songs.controller';
songsModule.controller('SongsCtrl', SongsCtrl);

import DetailsSongsCtrl from './detailsSongs.controller';
songsModule.controller('DetailsSongsCtrl', DetailsSongsCtrl);

export default songsModule;