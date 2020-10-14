class SongActionsCtrl {
    constructor(Songs, User, $state) {
      'ngInject';
  
      this._Songs = Songs;
      this._$state = $state;
  
      this.$onInit = () => {
          if (User.current) {
            this.canModify = (User.current.username === this.song.uploaded.username);
          } else {
            this.canModify = false;
          }
      }
  
    }
  
    deleteSong() {
      this.isDeleting = true;
      this._Songs.delete(this.song.slug).then(
        (success) => this._$state.go('app.home'),
        (err) => this._$state.go('app.home')
      )
    }
  }
  
  let SongActions = {
    bindings: {
      song: '='
    },
    controller: SongActionsCtrl,
    templateUrl: 'components/song-helpers/song-actions.html'
  };
  
export default SongActions;
  