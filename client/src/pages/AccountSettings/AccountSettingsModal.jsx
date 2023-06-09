import React, { useState } from "react";
import clsx from "clsx";
import { useFormik } from "formik";
import Avatar from "react-avatar-edit";

//Local Api
import { ChangeEmail, ChangeName, ChangePassword } from "internalApi";

//Components
import PasswordVisibilityIcon from "components/PasswordVisibilityIcon/PasswordVisibilityIcon";

//React Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import styles from "./accountsettingsmodal.module.css";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";

function AccountSettingsModal({
  handleClose,
  handleShow,
  show,
  setShow,
  callingOptions,
  src,
  setSrc,
  onCrop,
  onClose,
  handleSubmitProfileImage,
  setCurrentUser,
}) {
  const [showPassword, setShowPassword] = useState([]);

  const [isChangingSettings, setIsChangingSettings] = useState([]);

  function handleShowPassword(id) {
    let x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    if (showPassword.includes(id)) {
      const newArray = showPassword.filter((i) => i !== id);
      return setShowPassword(newArray);
    }
    setShowPassword((prevValues) => {
      return [...prevValues, id];
    });
  }

  const formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: callingOptions?.validations,
    onSubmit: async (values, bag) => {
      try {
        setIsChangingSettings([...isChangingSettings, "3"]);
        await ChangePassword(values.currentPassword, values.newPassword);
        handleClose();
        formikPassword.resetForm();
      } catch (err) {
        bag.setErrors({ general: err.response.data });
      }
      const updatedChangingSettings = isChangingSettings.filter(
        (i) => i !== "3"
      );
      setIsChangingSettings(updatedChangingSettings);
    },
  });

  const changePassword = (
    <Modal
      onExited={() => {
        setShowPassword([]);
        formikPassword.resetForm();
      }}
      key="3"
      className="d-flex justify-content-center"
      centered
      show={show}
      onHide={() => setShow(false)}
      dialogClassName={styles.modalDialog}
      contentClassName="setting-modal-content"
    >
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>{callingOptions?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row no-gutters justify-content-center">
          {callingOptions?.calledFor === "password" && (
            <form className="w-100" onSubmit={formikPassword.handleSubmit}>
              <div className="form-group">
                <div className="col-12 mb-3">
                  {formikPassword.errors.general && (
                    <div className="alert alert-danger">
                      {formikPassword.errors.general}
                    </div>
                  )}
                  <label className="mb-1" name="currentPassword">
                    Current Password
                  </label>
                  <div
                    className={clsx(
                      "border rounded d-flex justify-content-center align-items-center",
                      formikPassword.errors.currentPassword &&
                        formikPassword.touched.currentPassword &&
                        "border-danger error-border"
                    )}
                  >
                    <input
                      onChange={formikPassword.handleChange}
                      onBlur={formikPassword.handleBlur}
                      value={formikPassword.values.currentPassword}
                      name="currentPassword"
                      id="currentPassword"
                      placeholder="Enter your current password"
                      type="password"
                      className={clsx("form-control border-0 rounded")}
                    />
                    <div className="mr-2">
                      <PasswordVisibilityIcon
                        key="1"
                        id="currentPassword"
                        showPassword={showPassword}
                        handleShowPassword={handleShowPassword}
                      />
                    </div>
                  </div>
                  {formikPassword.errors.currentPassword &&
                    formikPassword.touched.currentPassword && (
                      <p className="mt-1 text-danger">
                        {formikPassword.errors.currentPassword}
                      </p>
                    )}
                </div>
                <div className="col-12">
                  <label className="mb-1" name="newPassord">
                    New Password
                  </label>
                  <div
                    className={clsx(
                      "border rounded d-flex justify-content-center align-items-center",
                      formikPassword.errors.newPassword &&
                        formikPassword.touched.newPassword &&
                        "border-danger error-border"
                    )}
                  >
                    <input
                      onChange={formikPassword.handleChange}
                      onBlur={formikPassword.handleBlur}
                      value={formikPassword.values.newPassword}
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className={clsx("form-control border-0 rounded")}
                    />
                    <div className="mr-2">
                      <PasswordVisibilityIcon
                        key="2"
                        id="newPassword"
                        showPassword={showPassword}
                        handleShowPassword={handleShowPassword}
                      />
                    </div>
                  </div>
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
        <Button onClick={() => handleClose()}>Close</Button>
        <button
          disabled={isChangingSettings.includes("3")}
          type="submit"
          className="btn btn-dark d-flex"
          onClick={() => formikPassword.handleSubmit()}
        >
          Save{" "}
          {isChangingSettings.includes("3") && (
            <div className="ml-2">
              <ClipLoader size="12px" />
            </div>
          )}
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
        setIsChangingSettings([...isChangingSettings, "1"]);
        const updatedeUser = await ChangeEmail(
          values.newEmail,
          values.currentPassword
        );
        setCurrentUser(updatedeUser);
        handleClose();
        formikEmail.resetForm();
      } catch (err) {
        bag.setErrors({ general: err.response.data });
      }
      const updatedChangingSettings = isChangingSettings.filter(
        (i) => i !== "1"
      );
      setIsChangingSettings(updatedChangingSettings);
    },
  });

  const changeEmail = (
    <Modal
      onExited={() => {
        setShowPassword([]);
        formikEmail.resetForm();
      }}
      className="d-flex justify-content-center"
      key={"1"}
      centered
      show={show}
      onHide={() => setShow(false)}
      dialogClassName={styles.modalDialog}
      contentClassName="setting-modal-content"
    >
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>{callingOptions?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row no-gutters justify-content-center">
          <form className="w-100" onSubmit={formikEmail.handleSubmit}>
            <div className="form-group">
              <div className="col-12 mb-3">
                {formikEmail.errors.general && (
                  <div className="alert alert-danger">
                    {formikEmail.errors.general}
                  </div>
                )}
                <label className="mb-1" name="newEmail">
                  New Email
                </label>
                <div
                  className={clsx(
                    "border rounded",
                    formikEmail.errors.newEmail &&
                      formikEmail.touched.newEmail &&
                      "border-danger error-border"
                  )}
                >
                  <input
                    onChange={formikEmail.handleChange}
                    onBlur={formikEmail.handleBlur}
                    value={formikEmail.values.newEmail}
                    name="newEmail"
                    type="email"
                    placeholder="Enter new email"
                    className={clsx("form-control border-0 rounded")}
                  />
                </div>
                {formikEmail.errors.newEmail &&
                  formikEmail.touched.newEmail && (
                    <p className="mt-1 text-danger">
                      {formikEmail.errors.newEmail}
                    </p>
                  )}
              </div>
              <div className="col-12">
                <label className="mb-1" name="currentPassword">
                  Current Password
                </label>
                <div
                  className={clsx(
                    "bg-white border rounded d-flex justify-content-center align-items-center",
                    formikEmail.errors.currentPassword &&
                      formikEmail.touched.currentPassword &&
                      "border-danger error-border"
                  )}
                >
                  <input
                    onChange={formikEmail.handleChange}
                    onBlur={formikEmail.handleBlur}
                    value={formikEmail.values.currentPassword}
                    name="currentPassword"
                    id="currentPassword"
                    type="password"
                    placeholder="Enter your password"
                    className={clsx("form-control border-0 rounded")}
                  />
                  <div className="mr-2">
                    <PasswordVisibilityIcon
                      key="3"
                      id="currentPassword"
                      showPassword={showPassword}
                      handleShowPassword={handleShowPassword}
                    />
                  </div>
                </div>
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
        <Button onClick={() => handleClose()}>Close</Button>
        <button
          disabled={isChangingSettings.includes("1")}
          type="submit"
          className="btn btn-dark d-flex"
          onClick={() => formikEmail.handleSubmit()}
        >
          Save{" "}
          {isChangingSettings.includes("1") && (
            <div className="ml-2">
              <ClipLoader size="12px" />
            </div>
          )}
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
        setIsChangingSettings([...isChangingSettings, "2"]);
        const updatedeUser = await ChangeName(
          values.newName,
          values.currentPassword
        );
        setCurrentUser(updatedeUser);
        handleClose();
        formikName.resetForm();
      } catch (err) {
        bag.setErrors({ general: err.response.data });
      }
      const updatedChangingSettings = isChangingSettings.filter(
        (i) => i !== "2"
      );
      setIsChangingSettings(updatedChangingSettings);
    },
  });

  const changeName = (
    <Modal
      onExited={() => {
        setShowPassword([]);
        formikName.resetForm();
      }}
      key="2"
      className="d-flex justify-content-center"
      centered
      show={show}
      onHide={() => setShow(false)}
      dialogClassName={styles.modalDialog}
      contentClassName="setting-modal-content"
    >
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>{callingOptions?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row no-gutters justify-content-center">
          <form className="w-100" onSubmit={formikName.handleSubmit}>
            <div className="form-group">
              <div className="col-12 mb-3">
                {formikName.errors.general && (
                  <div className="alert alert-danger">
                    {formikName.errors.general}
                  </div>
                )}
                <label name="newName" className="mb-1">
                  New Name
                </label>
                <div
                  className={clsx(
                    "border rounded",
                    formikName.errors.newName &&
                      formikName.touched.newName &&
                      "border-danger error-border"
                  )}
                >
                  <input
                    onChange={formikName.handleChange}
                    onBlur={formikName.handleBlur}
                    value={formikName.values.newName}
                    name="newName"
                    type="text"
                    placeholder="Enter new name"
                    className={clsx(
                      formikName.errors.newName && formikName.touched.newName
                        ? "border border-danger error-border"
                        : null,
                      "form-control border-0 rounded"
                    )}
                  />
                </div>
                {formikName.errors.newName && formikName.touched.newName && (
                  <p className="mt-1 text-danger">
                    {formikName.errors.newName}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label className="mb-1" name="currentPassword">
                  Current Password
                </label>
                <div
                  className={clsx(
                    "border rounded d-flex justify-content-center align-items-center position-relative",
                    formikName.errors.currentPassword &&
                      formikName.touched.currentPassword &&
                      "border-danger error-border"
                  )}
                >
                  <input
                    onChange={formikName.handleChange}
                    onBlur={formikName.handleBlur}
                    value={formikName.values.currentPassword}
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Enter your password"
                    type="password"
                    className={clsx("form-control border-0 rounded")}
                  />
                  <div className="mr-2">
                    <PasswordVisibilityIcon
                      key="4"
                      id="currentPassword"
                      showPassword={showPassword}
                      handleShowPassword={handleShowPassword}
                    />
                  </div>
                </div>

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
        <Button type="reset" onClick={() => handleClose()}>
          Close
        </Button>
        <Button
          disabled={isChangingSettings.includes("2")}
          type="submit"
          onClick={() => formikName.handleSubmit()}
          className="btn btn-dark d-flex"
        >
          Save{" "}
          {isChangingSettings.includes("2") && (
            <div className="ml-2">
              <ClipLoader size="12px" />
            </div>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const changeProfileImage = (
    <Modal
      key="4"
      className="d-flex justify-content-center"
      centered
      show={show}
      dialogClassName={styles.modalDialog}
      onHide={() => {
        setShow(false);
      }}
      contentClassName="setting-modal-content"
    >
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title>{callingOptions?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row no-gutters">
          <div className="col-12">
            <Avatar
              width="400"
              height="300"
              src={src}
              onClose={onClose}
              onCrop={onCrop}
              exportSize="1000"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          type="reset"
          onClick={() => {
            handleClose();
            onClose();
          }}
        >
          Close
        </Button>
        <Button
          type="submit"
          className="btn btn-dark"
          onClick={() => {
            handleSubmitProfileImage();
            handleClose();
            onClose();
          }}
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
    : callingOptions?.calledFor === "name"
    ? changeName
    : changeProfileImage;
}

export default AccountSettingsModal;
