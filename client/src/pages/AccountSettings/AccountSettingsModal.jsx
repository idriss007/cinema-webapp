import React, { useState } from "react";
import clsx from "clsx";
import { useFormik } from "formik";

//React Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ChangeEmail, ChangeName, ChangePassword } from "internalApi";

function AccountSettingsModal({
  handleClose,
  handleShow,
  show,
  setShow,
  callingOptions,
}) {
  const formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: callingOptions?.validations,
    onSubmit: async (values, bag) => {
      try {
        await ChangePassword(values.currentPassword, values.newPassword);
        handleClose();
      } catch (err) {
        bag.setErrors({ general: err.response.data });
      }
    },
  });

  const changePassword = (
    <Modal
      key="3"
      className="d-flex justify-content-center"
      centered
      show={show}
      onHide={() => {
        setShow(false);
        formikPassword.resetForm();
      }}
      dialogClassName="setting-modal-dialog"
      contentClassName="setting-modal-content"
    >
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>{callingOptions?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row no-gutters">
          {callingOptions?.calledFor === "password" && (
            <form onSubmit={formikPassword.handleSubmit}>
              <div className="form-group">
                <div className="col-12">
                  {formikPassword.errors.general && (
                    <div className="alert alert-danger">
                      {formikPassword.errors.general}
                    </div>
                  )}
                  <label name="currentPassword">Current Password</label>
                  <input
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    value={formikPassword.values.currentPassword}
                    name="currentPassword"
                    type="password"
                    className="form-control"
                  />
                  {formikPassword.errors.currentPassword &&
                    formikPassword.touched.currentPassword && (
                      <p className="mt-1 text-danger">
                        {formikPassword.errors.currentPassword}
                      </p>
                    )}
                </div>
                <div className="col-12">
                  <label name="newPassord">New Password</label>
                  <input
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    value={formikPassword.values.newPassword}
                    name="newPassword"
                    type="password"
                    className="form-control"
                  />
                  {formikPassword.errors.newPassword &&
                    formikPassword.touched.newPassword && (
                      <p className="mt-1 text-danger">
                        {formikPassword.errors.newPassword}
                      </p>
                    )}
                </div>
              </div>
            </form>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          onClick={() => {
            handleClose();
            formikPassword.resetForm();
          }}
        >
          Close
        </Button>
        <button
          type="submit"
          className="btn btn-dark"
          onClick={() => formikPassword.handleSubmit()}
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );

  const formikEmail = useFormik({
    initialValues: {
      newEmail: "",
      currentPassword: "",
    },
    validationSchema: callingOptions?.validations,
    onSubmit: async (values, bag) => {
      try {
        await ChangeEmail(values.newEmail, values.currentPassword);
        handleClose();
      } catch (err) {
        bag.setErrors({ general: err.response.data });
      }
    },
  });

  const changeEmail = (
    <Modal
      className="d-flex justify-content-center"
      key={"1"}
      centered
      show={show}
      onHide={() => {
        setShow(false);
        formikEmail.resetForm();
      }}
      dialogClassName="setting-modal-dialog"
      contentClassName="setting-modal-content"
    >
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>{callingOptions?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row no-gutters">
          <form onSubmit={formikEmail.handleSubmit}>
            <div className="form-group">
              <div className="col-12">
                {formikEmail.errors.general && (
                  <div className="alert alert-danger">
                    {formikEmail.errors.general}
                  </div>
                )}
                <label name="newEmail">New Email</label>
                <input
                  onChange={formikEmail.handleChange}
                  onBlur={formikEmail.handleBlur}
                  value={formikEmail.values.newEmail}
                  name="newEmail"
                  type="email"
                  className="form-control"
                />
                {formikEmail.errors.newEmail &&
                  formikEmail.touched.newEmail && (
                    <p className="mt-1 text-danger">
                      {formikEmail.errors.newEmail}
                    </p>
                  )}
              </div>
              <div className="col-12">
                <label name="currentPassword">Current Password</label>
                <input
                  onChange={formikEmail.handleChange}
                  onBlur={formikEmail.handleBlur}
                  value={formikEmail.values.currentPassword}
                  name="currentPassword"
                  type="password"
                  className="form-control"
                />
                {formikEmail.errors.currentPassword &&
                  formikEmail.touched.currentPassword && (
                    <p className="mt-1 text-danger">
                      {formikEmail.errors.currentPassword}
                    </p>
                  )}
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          onClick={() => {
            handleClose();
            formikEmail.resetForm();
          }}
        >
          Close
        </Button>
        <button
          type="submit"
          className="btn btn-dark"
          onClick={() => formikEmail.handleSubmit()}
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );

  const formikName = useFormik({
    initialValues: {
      newName: "",
      currentPassword: "",
    },
    validationSchema: callingOptions?.validations,
    onSubmit: async (values, bag) => {
      try {
        await ChangeName(values.newName, values.currentPassword);
        handleClose();
      } catch (err) {
        bag.setErrors({ general: err.response.data });
      }
    },
  });

  const changeName = (
    <Modal
      key="2"
      className="d-flex justify-content-center"
      centered
      show={show}
      onHide={() => {
        setShow(false);
        formikName.resetForm();
      }}
      dialogClassName="setting-modal-dialog"
      contentClassName="setting-modal-content"
    >
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>{callingOptions?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row no-gutters">
          <form onSubmit={formikName.handleSubmit}>
            <div className="form-group">
              <div className="col-12">
                {formikName.errors.general && (
                  <div className="alert alert-danger">
                    {formikName.errors.general}
                  </div>
                )}
                <label name="newName">New Name</label>
                <input
                  onChange={formikName.handleChange}
                  onBlur={formikName.handleBlur}
                  value={formikName.values.newName}
                  name="newName"
                  type="text"
                  className="form-control"
                />
                {formikName.errors.newName && formikName.touched.newName && (
                  <p className="mt-1 text-danger">
                    {formikName.errors.newName}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label name="currentPassword">Current Password</label>
                <input
                  onChange={formikName.handleChange}
                  onBlur={formikName.handleBlur}
                  value={formikName.values.currentPassword}
                  name="currentPassword"
                  type="password"
                  className="form-control"
                />
                {formikName.errors.currentPassword &&
                  formikName.touched.currentPassword && (
                    <p className="mt-1 text-danger">
                      {formikName.errors.currentPassword}
                    </p>
                  )}
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          type="reset"
          onClick={() => {
            handleClose();
            formikName.resetForm();
          }}
        >
          Close
        </Button>
        <Button
          type="submit"
          onClick={() => formikName.handleSubmit()}
          className="btn btn-dark"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return callingOptions?.calledFor === "password"
    ? changePassword
    : callingOptions?.calledFor === "email"
    ? changeEmail
    : changeName;
  // <Modal
  //   className="d-flex justify-content-center"
  //   centered
  //   show={show}
  //   onHide={() => setShow(false)}
  //   dialogClassName="setting-modal-dialog"
  //   contentClassName="setting-modal-content"
  // >
  //   <Modal.Header className="d-flex justify-content-center align-items-center">
  //     <Modal.Title>{callingOptions?.title}</Modal.Title>
  //   </Modal.Header>
  //   <Modal.Body>
  //     <div className="row no-gutters">
  //       {callingOptions?.calledFor === "password" && (
  //         <>
  //           <div className="form-group col-12">
  //             <label for="currentPassword">Current Password</label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               id="currentPassword"
  //             />
  //           </div>
  //           <div className="form-group col-12">
  //             <label for="newPassord">New Password</label>
  //             <input type="password" className="form-control" id="newPassord" />
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </Modal.Body>
  //   <Modal.Footer className="d-flex justify-content-center">
  //     <Button onClick={() => handleClose()}>Close</Button>
  //   </Modal.Footer>
  // </Modal>
}

export default AccountSettingsModal;
