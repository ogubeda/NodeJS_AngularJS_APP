class CommentCtrl {
    constructor(User) {
      'ngInject';

  
      this.$onInit = () => {
        if (User.current) {
          this.canModify = (User.current.username === this.data.author.username);
        } else {
          this.canModify = false;
        }
      }
    }
  }
  
  let Comment = {
    bindings: {
      data: '=',
      deleteCb: '&'
    },
    controller: CommentCtrl,
    templateUrl: 'components/song-helpers/comment.html'
  };
  
  export default Comment;
  