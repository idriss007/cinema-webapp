import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

//Local Api
// import { AddToList, RemoveFromList } from "../../api";
import { AddToList, RemoveFromList } from "internalApi";

//Components
import ListCard from "components/ListCard/ListCard";

//Stylesheet
import styles from "./newlist.module.css";

function NewList({ lists, movie }) {
  const [isInList, setIsInList] = useState([]);

  async function addToList(list_id, movie) {
    await AddToList(list_id, movie);
  }

  async function removeFromList(list_id, movie) {
    await RemoveFromList(list_id, movie);
  }
  return (
    <div
      className="modal fade w-100 h-100"
      id="newListModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className={clsx(
          styles.modal,
          "modal-dialog d-flex justify-content-center align-items-center w-100 h-100 mw-100 m-0"
        )}
        role="document"
      >
        <div
          className={clsx(styles.container, "modal-content rounded-0 w-auto")}
        >
          <div className="modal-header justify-content-center">
            <p className="">Add to List</p>
          </div>
          <div className="modal-body p-0">
            <div className="row no-gutters">
              <div className="col-12">
                <Link
                  reloadDocument={true}
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={"/list/create"}
                >
                  <button
                    className={clsx(
                      styles.button,
                      "w-100 p-3 d-flex justify-content-start"
                    )}
                  >
                    Create new List
                  </button>
                </Link>
              </div>

              {lists &&
                lists
                  .slice(3)
                  .map((list, index) => (
                    <ListCard
                      key={index}
                      list={list}
                      index={index}
                      isInList={isInList}
                      setIsInList={setIsInList}
                      movie={movie}
                      addToList={addToList}
                      removeFromList={removeFromList}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewList;
