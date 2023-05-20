import React, { useContext, useEffect, useState } from "react";

//Contexts
import AuthContext from "context/AuthContext";
import AccountSettingsModal from "./AccountSettingsModal";

//Validation Schemas
import passwordValidations from "./passwordValidations";
import emailValidations from "./emailValidations";
import nameValidations from "./nameValidations";

//React Icons
import { FaUserCircle } from "react-icons/fa";
import { ChangeProfileImage } from "internalApi";

function AccountSettings() {
  const { user } = useContext(AuthContext);
  const { _id, name, email, profile_image } = user;

  const [callingOptions, setCallingOptions] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [src, setSrc] = useState();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setCurrentUser({
      ...currentUser,
      name: name,
      email: email,
      profile_image: profile_image,
    });
  }, []);

  function onClose() {
    setPreview(null);
  }

  function onCrop(view) {
    setPreview(view);
  }

  async function handleSubmitProfileImage() {
    const updatedUser = await ChangeProfileImage(preview);
    setCurrentUser(updatedUser);
    setSrc(null);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function handleShow(title, calledFor, validations) {
    setCallingOptions({
      title: title,
      calledFor: calledFor,
      validations: validations,
    });
    setShow(true);
  }

  return (
    <>
      <div className="container customContainer">
        <div className="row no-gutters h1 line-height-1">Account Settings</div>
        <div className="p-3 border rounded">
          <div className="row no-gutters justify-content-center">
            <div className="col-10 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center flex-column align-items-center">
              {currentUser?.profile_image ? (
                <img
                  className="w-75"
                  src={currentUser?.profile_image}
                  alt="avatar"
                />
              ) : (
                <FaUserCircle size="100" />
              )}
              <button
                className="btn btn-outline-dark p-2 pl-3 pr-3 mt-3"
                onClick={() => handleShow("Upload", "profile_image")}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="row no-gutters">
            <div className="col-12 d-flex justify-content-between align-items-center p-2">
              <div className="">
                <span className="font-weight-bold">Name: </span>
                {currentUser?.name}
              </div>
              <button
                className="btn btn-outline-dark p-2 pl-3 pr-3"
                onClick={() => handleShow("Edit Name", "name", nameValidations)}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="row no-gutters">
            <div className="col-12 d-flex justify-content-between align-items-center p-2">
              <div className="">
                <span className="font-weight-bold">Email: </span>
                {currentUser.email}
              </div>
              <button
                className="btn btn-outline-dark p-2 pl-3 pr-3"
                onClick={() =>
                  handleShow("Edit Email", "email", emailValidations)
                }
              >
                Edit
              </button>
            </div>
          </div>

          <div className="row no-gutters">
            <div className="col-12 d-flex justify-content-between align-items-center p-2">
              <div className="">
                <span className="font-weight-bold">Password: </span>*****
              </div>
              <button
                className="btn btn-outline-dark p-2 pl-3 pr-3"
                onClick={() =>
                  handleShow("Edit Password", "password", passwordValidations)
                }
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <AccountSettingsModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        setShow={setShow}
        callingOptions={callingOptions}
        src={src}
        setSrc={setSrc}
        onClose={onClose}
        onCrop={onCrop}
        handleSubmitProfileImage={handleSubmitProfileImage}
        setCurrentUser={setCurrentUser}
      />
    </>
  );
}

export default AccountSettings;
