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

function AddToCustomListModal({ lists, movie }) {
  const [isInList, setIsInList] = useState([]);
  const [isInListLoading, setIsInListLoading] = useState([]);

  async function addToList(list_id, movie, index) {
    try {
      setIsInListLoading([...isInListLoading, index]);
      await AddToList(list_id, movie);
      setIsInList([...isInList, index]);
    } catch (error) {
      console.log(error);
    }
    const updatedLoadingList = isInListLoading.filter((i) => i !== index);
    setIsInListLoading(updatedLoadingList);
  }

  async function removeFromList(list_id, movie, index) {
    try {
      setIsInListLoading([...isInListLoading, index]);
      await RemoveFromList(list_id, movie);
      const upsatedIsInList = isInList.filter((i) => i !== index);
      setIsInList(upsatedIsInList);
    } catch (error) {
      console.log(error);
    }
    const updatedLoadingList = isInListLoading.filter((i) => i !== index);
    setIsInListLoading(updatedLoadingList);
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
                      isInListLoading={isInListLoading}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCustomListModal;
