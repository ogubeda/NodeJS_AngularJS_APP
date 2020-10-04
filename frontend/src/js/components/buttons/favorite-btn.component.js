class FavoriteBtnCtrl {
  constructor(User, Songs, $state) {
    'ngInject';

    this._User = User;
    this._Songs = Songs;
    this._$state = $state;

    console.log();

  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    if (this.song.favorited) {
      this._Songs.delFav(this.song.slug).then(
        () => {
          this.isSubmitting = false;
          this.song.favorited = false;
          this.song.favoritesCount--;
        }
      )

    } else {
      this._Songs.addFav(this.song.slug).then(
        () => {
          this.isSubmitting = false;
          this.song.favorited = true;
          this.song.favoritesCount++;
        }
      )
    }

  }

}

let FavoriteBtn= {
  bindings: {
    song: '='
  },
  transclude: true,
  controller: FavoriteBtnCtrl,
  templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;
