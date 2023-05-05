import React, { useContext, useEffect, useState } from "react";
import {
  DeleteComment,
  FetchAllComments,
  PostComment,
  UpdateComment,
} from "../../api";
import Comment from "../../components/Comment/Comment";
import AuthContext from "../../context/AuthContext";

import Container from "react-bootstrap/Container";

import CommentForm from "../../components/CommentForm/CommentForm";

function Comments({ movie_id }) {
  const [comments, setComments] = useState();
  //hangi yorumda edit mi reply mi ettiğimizi depolayacak state.
  const [activeComment, setActiveComment] = useState();

  const rootComments = comments?.filter((comment) => comment.parentId === null);

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

  useEffect(() => {
    (async () => {
      try {
        const allComments = await FetchAllComments(movie_id);
        setComments(allComments);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
    console.log(body, parent_id);
    const addedComment = await PostComment(user._id, movie_id, body, parent_id);
    setComments([addedComment, ...comments]);
    setActiveComment(null);
  }

  async function deleteComment(comment_id, user_id) {
    if (window.confirm("Are you sure that you want to remove the comment?")) {
      // navigate(0);
      const deletedComment = await DeleteComment(comment_id, user_id);
      const filteredComments = comments.filter(
        (comment) => comment._id !== deletedComment._id
      );
      setComments(filteredComments);
    }
  }

  async function updateComment(body, comment_id, user_id) {
    await UpdateComment(comment_id, body, user_id);
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
      <Container fluid>
        {loggedIn ? (
          <CommentForm submitLabel="Send Comment" handleSubmit={addComment} />
        ) : (
          "Sign in to write a comment."
        )}
      </Container>

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
