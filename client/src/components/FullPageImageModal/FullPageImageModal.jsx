import React from "react";

//React Bootstrap
import { Modal } from "react-bootstrap";

//ConfigData File
import configData from "config.json";

//Stylesheet
import styles from "./fullpageimagemodal.module.css";

function FullPageImageModal({ show, setShow, showKey, handleClose, imageUrl }) {
  return (
    <Modal
      key={showKey}
      className="d-flex justify-content-center"
      centered
      show={show}
      onHide={() => setShow(false)}
      dialogClassName={styles.modalDialog}
      contentClassName={styles.content}
    >
      <Modal.Body className={styles.body}>
        <img
          className={styles.image}
          src={`${configData.imageOriginalUrl}${imageUrl}`}
          alt=""
        />
        <button
          className="btn btn-primary mt-1 mb-1"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default FullPageImageModal;
