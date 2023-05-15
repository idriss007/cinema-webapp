import React, { useContext, useState } from "react";

//Contexts
import AuthContext from "context/AuthContext";
import AccountSettingsModal from "./AccountSettingsModal";

import passwordValidations from "./passwordValidations";
import emailValidations from "./emailValidations";
import nameValidations from "./nameValidations";

function AccountSettings() {
  const { user } = useContext(AuthContext);
  const { _id, name, email } = user;

  const [callingOptions, setCallingOptions] = useState();

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
        <div className="row no-gutters">
          <div className="col-12 h1 line-height-1">Account Settings</div>
          <div className="col-12">
            <div className="row no-gutters p-3 border rounded">
              <div className="col-12 p-2">
                {/* <input type="file" class="custom-file-input" id="customFile" />
              <label class="custom-file-label" for="customFile">
                Choose file
              </label> */}
                <input className="" type="file" />
              </div>

              <div className="col-12 d-flex justify-content-between align-items-center p-2">
                <div className="">
                  <span className="font-weight-bold">Name: </span>
                  {name}
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
              <div className="col-12 d-flex justify-content-between align-items-center p-2">
                <div className="">
                  <span className="font-weight-bold">Email: </span>
                  {email}
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
      </div>
      <AccountSettingsModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        setShow={setShow}
        callingOptions={callingOptions}
      />
    </>
  );
}

export default AccountSettings;
