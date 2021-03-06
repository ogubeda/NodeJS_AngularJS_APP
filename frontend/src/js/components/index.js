import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import ArticlePreview from './article-helpers/article-preview.component';
componentsModule.component('articlePreview', ArticlePreview);

import ArticleList from './article-helpers/article-list.component';
componentsModule.component('articleList', ArticleList);

import ListPagination from './songs-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);

import SongsList from './songs-helpers/songs-list.component';
componentsModule.component('songsList', SongsList);

import SongsPreview from './songs-helpers/songs-preview.component';
componentsModule.component('songsPreview', SongsPreview);

import Comment from './song-helpers/comment.component';
componentsModule.component('comment', Comment);

import SongActions from './song-helpers/song-actions.component';
componentsModule.component('songActions', SongActions);

import GroupsList from './groups-helpers/groups-list.component';
componentsModule.component('groupsList', GroupsList);

import GroupsPreview from './groups-helpers/groups-preview.component';
componentsModule.component('groupsPreview', GroupsPreview);

export default componentsModule;
