import React, { useContext, useEffect, useState } from "react";

//Local Api
// import {
//   DeleteComment,
//   FetchAllComments,
//   PostComment,
//   UpdateComment,
// } from "../../api";
import {
  DeleteComment,
  FetchAllComments,
  PostComment,
  UpdateComment,
} from "internalApi";

//Components
import Comment from "components/Comment/Comment";
import CommentForm from "components/CommentForm/CommentForm";

//Context
import AuthContext from "context/AuthContext";

function Comments({ movie_id }) {
  const { loggedIn, user } = useContext(AuthContext);
  const [comments, setComments] = useState();
  //hangi yorumda edit mi reply mi ettiğimizi depolayacak state.
  const [activeComment, setActiveComment] = useState();

  let rootComments = comments?.filter((comment) => comment.parentId === null);

  useEffect(() => {
    (async () => {
      try {
        const allComments = await FetchAllComments(movie_id);
        setComments(allComments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //Parent id'si parametre olarak gönderilen comment id ile eşleşen commentleri al.
  function getReplies(comment_id) {
    return comments
      .filter((comment) => comment.parentId === comment_id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }

  async function addComment(body, parent_id) {
    const addedComment = await PostComment(movie_id, body, parent_id);
    setComments([addedComment, ...comments]);
    setActiveComment(null);
  }

  async function deleteComment(comment_id, user_id) {
    if (window.confirm("Are you sure that you want to remove the comment?")) {
      const deletedComment = await DeleteComment(comment_id);

      //Parent yorum silinmişse ve child yorum kalmamışsa bu metod çalışır.
      if (deletedComment.deleteParent) {
        let updatedComments = comments.filter(
          (comment) => comment.id !== deletedComment.deletedComment._id
        );
        updatedComments = updatedComments.filter(
          (comment) => comment._id !== deletedComment.deletedComment.parentId
        );
        return setComments(updatedComments);
      }

      //Herhangi bir yorum silinince bu metod çalışır.
      if (deletedComment.isDeleted) {
        const updatedComments = comments.filter(
          (comment) => comment._id !== deletedComment._id
        );
        return setComments(updatedComments);
      }

      //Parent yorumun child yorumu varsa ve parent yorum silinmişse bu metod çalışır.
      if (deletedComment.isDeletedContent) {
        const updatedComments = comments.map((comment) => {
          if (comment._id === deletedComment._id) {
            return deletedComment;
          }
          return comment;
        });
        setComments(updatedComments);
      }
    }
  }

  async function updateComment(body, comment_id, user_id) {
    await UpdateComment(comment_id, body);
    const updatedComments = comments.map((comment) => {
      if (comment._id === comment_id) {
        return { ...comment, body: body };
      }
      return comment;
    });
    setComments(updatedComments);
    setActiveComment(null);
  }

  function renderComments(rootComment, index) {
    return (
      <Comment
        key={rootComment._id}
        comment={rootComment}
        replies={getReplies(rootComment._id)}
        user={user}
        deleteComment={deleteComment}
        addComment={addComment}
        updateComment={updateComment}
        activeComment={activeComment}
        setActiveComment={setActiveComment}
      />
    );
  }

  return (
    <>
      <div className="mt-2">
        {loggedIn ? (
          <CommentForm submitLabel="Send Comment" handleSubmit={addComment} />
        ) : (
          "Sign in to write a comment."
        )}
      </div>

      {rootComments
        ?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map(renderComments)}
    </>
  );
}

export default Comments;
