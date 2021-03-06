import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import GraphQLClientService from './graphql.service';
servicesModule.service('GraphQLClient', GraphQLClientService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);

import SongsService from './songs.service';
servicesModule.service('Songs', SongsService);

import ToastrService from './toastr.service';
servicesModule.service('Toastr', ToastrService);

import GroupsService from './groups.service';
servicesModule.service('Groups', GroupsService);


export default servicesModule;
