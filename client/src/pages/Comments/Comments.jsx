import React, { useContext, useState } from "react";
import { useQuery } from "react-query";

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
  const [comments, setComments] = useState();
  //hangi yorumda edit mi reply mi ettiğimizi depolayacak state.
  const [activeComment, setActiveComment] = useState();

  let rootComments = comments?.filter((comment) => comment.parentId === null);

  //Parent id'si parametre olarak gönderilen comment id ile eşleşen commentleri al.
  function getReplies(comment_id) {
    return comments
      .filter((comment) => comment.parentId === comment_id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }

  const { loggedIn, user } = useContext(AuthContext);

  const allComments = useQuery(["comments"], () => FetchAllComments(movie_id), {
    onSuccess: (allComments) => {
      setComments(allComments);
    },
  });

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

  async function addComment(body, parent_id) {
    const addedComment = await PostComment(movie_id, body, parent_id);
    setComments([addedComment, ...comments]);
    setActiveComment(null);
  }

  async function deleteComment(comment_id, user_id) {
    if (window.confirm("Are you sure that you want to remove the comment?")) {
      // navigate(0);

      const deletedComment = await DeleteComment(comment_id);

      if (!deletedComment.deleteParent) {
        const filteredComments = comments.filter(
          (comment) => comment._id !== deletedComment._id
        );
        setComments(filteredComments);
      }

      if (deletedComment.deleteParent) {
        let filteredComments = comments.filter(
          (comment) => comment._id !== deletedComment.deletedComment._id
        );
        filteredComments = filteredComments.filter(
          (comment) => comment._id !== deletedComment.deletedComment.parentId
        );
        setComments(filteredComments);
        rootComments = comments?.filter((comment) => comment.parentId === null);
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
