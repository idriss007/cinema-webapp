import React, { useState } from "react";
import moment from "moment";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//FontAwesome
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { MdDelete, MdAddComment } from "react-icons/md";

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

  const [hoverDelete, setHoverDelete] = useState();
  const [hoverEdit, setHoverEdit] = useState();
  const [hoverReply, setHoverReply] = useState();

  return (
    <Container className="mb-5 mt-5 border rounded p-3" fluid>
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
              handleSubmit={(text) =>
                updateComment(text, comment._id, comment.user._id)
              }
              handleCancel={() => setActiveComment(null)}
            />
          )}

          {user && !isEditing && (
            <div className="d-flex align-items-center mt-3">
              {canReply && (
                <button
                  className="btn p-0 mr-1 ml-1"
                  onClick={() =>
                    setActiveComment({ id: comment._id, type: "replying" })
                  }
                >
                  <MdAddComment
                    size="21"
                    onClick={() => setHoverReply(false)}
                    color={hoverReply ? "green" : null}
                    onMouseOver={() =>
                      setHoverReply({ isOver: true, for: "delete" })
                    }
                    onMouseOut={() => setHoverReply(false)}
                  />
                </button>
              )}
              {canDelete && (
                <button
                  className="btn p-0 mr-1 ml-1"
                  onClick={() => deleteComment(comment._id, comment.user._id)}
                >
                  <MdDelete
                    size="25"
                    onClick={() => setHoverDelete(false)}
                    color={hoverDelete ? "red" : null}
                    onMouseOver={() =>
                      setHoverDelete({ isOver: true, for: "delete" })
                    }
                    onMouseOut={() => setHoverDelete(false)}
                  />
                </button>
              )}
              {canEdit && (
                <button
                  className="btn p-0 mr-1 ml-1"
                  onClick={() =>
                    setActiveComment({ id: comment._id, type: "editing" })
                  }
                >
                  <FaEdit
                    size="23"
                    color={hoverEdit ? "orange" : null}
                    onClick={() => setHoverEdit(false)}
                    onMouseOver={() =>
                      setHoverEdit({ isOver: true, for: "delete" })
                    }
                    onMouseOut={() => setHoverEdit(false)}
                  />
                </button>
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
