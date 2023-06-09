import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

//Contexts
import AuthContext from "context/AuthContext";
import AccountSettingsModal from "./AccountSettingsModal";
import ListContext from "context/ListContext";

//Validation Schemas
import passwordValidations from "./passwordValidations";
import emailValidations from "./emailValidations";
import nameValidations from "./nameValidations";

//Local Api
import {
  ChangeProfileImage,
  GetUser,
  SetRatingsPrivacy,
  fetchLists,
} from "internalApi";

//React Icons
import { FaUserCircle } from "react-icons/fa";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";

function AccountSettings() {
  const { user } = useContext(AuthContext);

  const [ratingList, setRatingList] = useState(null);

  const [callingOptions, setCallingOptions] = useState();
  const [currentUser, setCurrentUser] = useState({});

  const [isRatingPrivacyLoading, setIsRatingPrivacyLoading] = useState(false);
  const [isRatingsPrivate, setIsRatingsPrivate] = useState();

  const [src, setSrc] = useState();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setIsRatingPrivacyLoading(true);
    ratingList && setIsRatingsPrivate(ratingList.isPrivate);
    ratingList && setIsRatingPrivacyLoading(false);
  }, [ratingList]);

  const foundUser = useQuery(["user", user._id], () => GetUser(user._id), {
    onSuccess: (foundUser) => {
      document.title = foundUser.name;
      setCurrentUser({
        ...currentUser,
        name: foundUser.name,
        email: foundUser.email,
        profile_image: foundUser.profile_image,
      });
    },
    retry: false,
  });

  const userLists = useQuery(["userLists"], () => fetchLists(user._id), {
    onSuccess: (userLists) =>
      ratingList === null && setRatingList(userLists[1]),
  });

  function onClose() {
    setPreview(null);
  }

  function onCrop(view) {
    setPreview(view);
  }

  async function handleSubmitProfileImage(
    isChangingSettings,
    setIsChangingSettings
  ) {
    setIsChangingSettings([...isChangingSettings, "4"]);
    const updatedUser = await ChangeProfileImage(preview);
    const updatedChangingSettings = isChangingSettings.filter((i) => i !== "2");
    setIsChangingSettings(updatedChangingSettings);
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
        const updatedList = await SetRatingsPrivacy(ratingList._id);
        // setIsRatingsPrivate(updatedList.isPrivate);
        setRatingList(updatedList);
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
        {foundUser.isLoading ? (
          <div className="w-100 d-flex justify-content-center align-items-center p-5 border rounded mb-5">
            <ClipLoader size="30px" />
          </div>
        ) : (
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
                  onClick={() =>
                    handleShow("Edit Name", "name", nameValidations)
                  }
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
                    : "Make ratings " +
                      (isRatingsPrivate ? "Public" : "Private")}
                </button>
              </div>
            </div>
          </div>
        )}
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
