class DetailsCtrl {
    constructor(song, comments, $scope, Comments) {
        "ngInject";

        this._$scope = $scope;
        this.song = song;
        this.comments = comments;
        this._Comments = Comments
    }// end_constructor


    resetCommentForm() {
        this.commentForm = {
            isSubmitting: false,
            body: '',
            errors: []
        }
    }

    addComment() {
        this.commentForm.isSubmitting = true;

        this._Comments.add(this.song.slug, this.commentForm.body).then(
            (comment) => {
                this.comments.unshift(comment);
                this.resetCommentForm();
            },
            (err) => {
                this.commentForm.isSubmitting = false;
                this.commentForm.errors = err.data.errors;
            }
        )
    }

    deleteComment(commentId, index) {
        this._Comments.destroy(commentId, this.song.slug).then(
            (success) => {
                this.comments.splice(index, 1);
            }
        )
    }
}// end_DetailsSongsCtrl

export default DetailsCtrl;