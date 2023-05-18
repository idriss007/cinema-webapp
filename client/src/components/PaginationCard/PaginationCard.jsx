import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

//Stylesheet
import styles from "./paginationcard.module.css";

function PaginationCard({ pageId, addToUrl, totalPages }) {
  if (!pageId) {
    pageId = "1";
  }

  const last = addToUrl ? addToUrl + "/" + totalPages : "" + totalPages;
  const next = addToUrl
    ? addToUrl + "/" + (pageId ? parseInt(pageId) + 1 : 2)
    : "" + (pageId ? parseInt(pageId) + 1 : 2);

  const first = addToUrl ? addToUrl : "";
  const previous = addToUrl
    ? addToUrl +
      "/" +
      (pageId ? (parseInt(pageId) === 2 ? "" : parseInt(pageId) - 1) : "")
    : "" + (pageId ? (parseInt(pageId) === 2 ? "" : parseInt(pageId) - 1) : "");

  const goLeftPage = addToUrl
    ? addToUrl +
      "/" +
      (pageId ? (parseInt(pageId) === 2 ? "" : parseInt(pageId) - 1) : "")
    : "" + (pageId ? (parseInt(pageId) === 2 ? "" : parseInt(pageId) - 1) : "");

  const goActivePage = addToUrl ? addToUrl + "/" + pageId : "" + pageId;

  const goRightPage = addToUrl
    ? addToUrl + "/" + (pageId ? parseInt(pageId) + 1 : 2)
    : "" + (pageId ? parseInt(pageId) + 1 : 2);

  return (
    <>
      {parseInt(pageId) > 2 && (
        <div className="col-auto">
          <Link
            className={clsx("btn rounded-0", styles.button)}
            reloadDocument={true}
            to={first}
          >
            {"<<"}
          </Link>
        </div>
      )}

      {pageId !== "1" && (
        <div className="col-auto">
          <Link
            className={clsx(styles.button, "btn rounded-0")}
            reloadDocument={true}
            to={previous}
          >
            {"<"}
          </Link>
        </div>
      )}

      {pageId !== "1" && (
        <div className="col-auto">
          <Link
            className={clsx(styles.button, "btn rounded-0")}
            reloadDocument={true}
            to={goLeftPage}
          >
            {pageId && parseInt(pageId) - 1}
          </Link>
        </div>
      )}

      <div className="col-auto">
        <Link
          className={clsx(styles.activeButton, "btn rounded-0")}
          reloadDocument={true}
          to={goActivePage}
        >
          {/* {pageId ? pageId : 1} */}
          {pageId}
        </Link>
      </div>

      {parseInt(pageId) !== totalPages &&
        totalPages - parseInt(pageId) >= 1 && (
          <div className="col-auto">
            <Link
              className={clsx(styles.button, "btn rounded-0")}
              reloadDocument={true}
              to={goRightPage}
            >
              {parseInt(pageId) + 1}
            </Link>
          </div>
        )}

      {parseInt(pageId) !== totalPages &&
        totalPages - parseInt(pageId) >= 1 && (
          <div className="col-auto">
            <Link
              className={clsx(styles.button, "btn rounded-0")}
              reloadDocument={true}
              to={next}
            >
              {">"}
            </Link>
          </div>
        )}

      {(totalPages - parseInt(pageId) > 1 || !pageId) &&
        totalPages - parseInt(pageId) > 1 && (
          <div className="col-auto">
            <Link
              className={clsx(styles.button, "btn rounded-0")}
              reloadDocument={true}
              to={last}
            >
              {">>"}
            </Link>
          </div>
        )}
    </>
  );
}

export default PaginationCard;
