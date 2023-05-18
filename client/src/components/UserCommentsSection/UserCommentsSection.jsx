import UserCommentCard from "components/UserCommentCard/UserCommentCard";
import React from "react";
import clsx from "clsx";

//Stylesheet
import styles from "./usercommentssection.module.css";

function UserCommentsSection({ comments, isAdmin }) {
  function renderComment(comment) {
    return <UserCommentCard comment={comment} />;
  }

  return (
    <div className="rounded border p-3 mt-2 mb-5 w-100">
      <button
        data-toggle="collapse"
        data-target="#collapseComments"
        className={clsx(styles.commentsBtn, "font-weight-bold")}
      >
        {isAdmin ? "Your Comments" : "Comments"}
      </button>
      <div className="p-3 collapse" id="collapseComments">
        {comments.data.length > 0
          ? comments.data.map((comment) => renderComment(comment))
          : "You haven't commented any titles yet."}
      </div>
    </div>
  );
}

export default UserCommentsSection;
