import angular from 'angular';

let detailsModule = angular.module('app.details',[]);

import DetailsConfig from './details.config';
detailsModule.config(DetailsConfig);

import DetailsCtrl from './details.controller';
detailsModule.controller('DetailsCtrl', DetailsCtrl);