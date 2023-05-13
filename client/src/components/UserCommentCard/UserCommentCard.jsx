import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import moment from "moment";

//External Api
import { getDetail } from "api";

function UserCommentCard({ comment }) {
  const movie = useQuery(["movie", comment._id], () =>
    getDetail(comment.movie_id)
  );

  if (movie.isLoading) {
    return "Loading...";
  }

  return (
    <div className="row border mt-3 mb-3 p-3 rounded">
      <div className="col-12 mb-2">
        <div className="row no-gutters h5 m-0 line-height-1">
          <Link to={`/detail/${comment.movie_id}`} style={{ color: "inherit" }}>
            {movie.data.title}
          </Link>
          <div className="ml-1">
            {`(${moment(movie.data.release_date).format("YYYY")})`}
          </div>
        </div>
      </div>
      <div className="col-12">
        <p>{comment.body}</p>
      </div>
    </div>
  );
}

export default UserCommentCard;
