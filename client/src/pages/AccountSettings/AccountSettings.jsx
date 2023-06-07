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
import { ChangeProfileImage, SetRatingsPrivacy } from "internalApi";
import ListContext from "context/ListContext";

function AccountSettings() {
  const { user } = useContext(AuthContext);
  const { lists } = useContext(ListContext);
  const { _id, name, email, profile_image } = user;

  const [callingOptions, setCallingOptions] = useState();
  const [currentUser, setCurrentUser] = useState({});

  const [isRatingPrivacyLoading, setIsRatingPrivacyLoading] = useState(false);
  const [isRatingsPrivate, setIsRatingsPrivate] = useState();

  const [src, setSrc] = useState();
  const [preview, setPreview] = useState(null);

  // const [ratingsPrivacyStatusText, setRatingsPrivacyStatusText] = useState(null);

  useEffect(() => {
    setIsRatingPrivacyLoading(true);
    setCurrentUser({
      ...currentUser,
      name: name,
      email: email,
      profile_image: profile_image,
    });
    // lists &&
    //   (lists[1].isPrivate
    //     ? setRatingsPrivacyStatusText("Public")
    //     : setRatingsPrivacyStatusText("Private"));
    lists && setIsRatingsPrivate(lists[1]?.isPrivate);
    lists && setIsRatingPrivacyLoading(false);
  }, [lists]);

  function onClose() {
    setPreview(null);
  }

  function onCrop(view) {
    setPreview(view);
  }

  async function handleSubmitProfileImage() {
    const updatedUser = await ChangeProfileImage(preview);
    user.profile_image = updatedUser.profile_image;
    setCurrentUser(updatedUser);
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

  async function handleRatingsPrivacy() {
    if (
      window.confirm(
        `Are you sure that you want to make ratings ${
          currentUser.isRatingsPrivate ? "public?" : "private?"
        }?`
      )
    ) {
      try {
        setIsRatingPrivacyLoading(true);
        const updatedList = await SetRatingsPrivacy(lists[1]?._id);
        setIsRatingsPrivate(updatedList.isPrivate);
      } catch (error) {
        console.log(error);
      }
      setIsRatingPrivacyLoading(false);
    }
  }

  return (
    <>
      <div className="container customContainer">
        <div className="row no-gutters h1 line-height-1">Account Settings</div>
        <div className="p-3 border rounded mb-5">
          <div className="row no-gutters justify-content-center">
            <div className="col-10 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center flex-column align-items-center">
              {currentUser.profile_image ? (
                <img
                  className="w-75"
                  src={currentUser.profile_image}
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

          <div className="row no-gutters">
            <div className="col-12 d-flex justify-content-between align-items-center p-2">
              <div className="">
                <span className="font-weight-bold">Ratings: </span>
                {isRatingPrivacyLoading
                  ? "Loading"
                  : isRatingsPrivate
                  ? "Private"
                  : "Public"}
              </div>
              <button
                className="btn btn-outline-dark p-2 pl-3 pr-3"
                onClick={() => handleRatingsPrivacy()}
                disabled={isRatingPrivacyLoading}
              >
                {isRatingPrivacyLoading
                  ? "Loading..."
                  : "Make ratings " + (isRatingsPrivate ? "Public" : "Private")}
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
