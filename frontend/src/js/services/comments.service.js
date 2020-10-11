export default class Comments {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }


  // Add a comment to an article
  add(slug, payload) {
    return this._$http({
      url: `${this._AppConstants.api}/songs/${slug}/comments`,
      method: 'POST',
      data: { comment: { body: payload } }
    }).then((res) => res.data.comment);

  }

  getAll(slug) {
    return this._$http({
      url: `${this._AppConstants.api}/songs/${slug}/comments`,
      method: 'GET',
    }).then((res) => res.data.comments);

  }

  destroy(commentId, slug) {
    return this._$http({
      url: `${this._AppConstants.api}/songs/${slug}/comments/${commentId}`,
      method: 'DELETE',
    });
  }

}
