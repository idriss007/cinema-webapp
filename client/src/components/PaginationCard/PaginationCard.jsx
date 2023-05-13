import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

//Stylesheet
import styles from "./paginationcard.module.css";

function PaginationCard({ pageId, addToUrl, totalPages }) {
  if (!pageId) {
    pageId = "1";
  }

  return (
    <>
      {parseInt(pageId) > 2 && (
        <div className="col-auto">
          <Link
            className={"btn rounded-0 " + styles.button}
            reloadDocument={true}
            to={addToUrl}
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
            to={
              addToUrl +
              "/" +
              (pageId
                ? parseInt(pageId) === 2
                  ? ""
                  : parseInt(pageId) - 1
                : "")
            }
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
            to={
              addToUrl +
              "/" +
              (pageId
                ? parseInt(pageId) === 2
                  ? ""
                  : parseInt(pageId) - 1
                : "")
            }
          >
            {pageId && parseInt(pageId) - 1}
          </Link>
        </div>
      )}

      <div className="col-auto">
        <Link
          className={clsx(styles.activeButton, "btn rounded-0")}
          reloadDocument={true}
          to={addToUrl + "/" + pageId}
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
              to={addToUrl + "/" + (pageId ? parseInt(pageId) + 1 : 2)}
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
              to={addToUrl + "/" + (pageId ? parseInt(pageId) + 1 : 2)}
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
              to={addToUrl + "/" + totalPages}
            >
              {">>"}
            </Link>
          </div>
        )}
    </>
  );
}

export default PaginationCard;
