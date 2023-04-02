import React from "react";
import moment from "moment";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//FontAwesome
import { FaUserCircle } from "react-icons/fa";
//Style File
import styles from "./comment.module.css";

import CommentForm from "../CommentForm/CommentForm";

function Comment({
  comment,
  replies,
  user,
  deleteComment,
  activeComment,
  addComment,
  updateComment,
  setActiveComment,
  parentId = null,
}) {
  const canReply = Boolean(user);
  const canEdit = user?._id === comment?.user?._id;
  const canDelete = user?._id === comment?.user?._id;
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment._id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;
  const replyId = parentId ? parentId : comment._id;

  return (
    <Container className="mb-5 mt-5" fluid>
      <Row>
        <Col className="d-flex w-100" md="auto">
          <div>
            <FaUserCircle size="50" />
          </div>
          <div className="d-flex flex-column justify-content-center ml-3">
            <div>{comment.user.name}</div>
            <div>{moment(comment.createdAt).format("DD/MM/YYYY")}</div>
            {/* <div>{comment.createdAt}</div> */}
            {comment.updatedAt !== comment.createdAt && (
              <div>{comment.updatedAt} tarihinde güncellendi.</div>
            )}
            {/* {(comment.updatedAt !== comment.createdAt) && (<div>{moment(comment.updatedAt).format("DD/MM/YYYY")} tarihinde güncellendi.</div>)} */}
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          {!isEditing && <div className="mt-3">{comment.body}</div>}
          {isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.body}
              handleSubmit={(text) => updateComment(text, comment._id)}
              handleCancel={() => setActiveComment(null)}
            />
          )}

          {user && !isEditing && (
            <div className="d-flex align-items-center mt-3 mb-3">
              {canReply && (
                <div
                  className="mr-2 btn btn-success"
                  onClick={() =>
                    setActiveComment({ id: comment._id, type: "replying" })
                  }
                >
                  Reply
                </div>
              )}
              {canDelete && (
                <div
                  className="mr-2 btn btn-danger"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </div>
              )}
              {canEdit && (
                <div
                  className="btn btn-warning"
                  onClick={() =>
                    setActiveComment({ id: comment._id, type: "editing" })
                  }
                >
                  Edit
                </div>
              )}
              {/* {canEdit && (<div className="btn btn-warning" onClick={handleUpdate}>Edit</div>)} */}
            </div>
          )}

          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
            />
          )}

          {replies.length > 0 && (
            <div className="ml-5">
              {replies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  replies={[]}
                  user={user}
                  deleteComment={deleteComment}
                  addComment={addComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  parentId={comment._id}
                  updateComment={updateComment}
                />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Comment;
