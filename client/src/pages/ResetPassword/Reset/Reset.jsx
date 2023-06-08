import React, { useState } from "react";
import clsx from "clsx";
import { useFormik } from "formik";

import validationSchema from "./validation";

import styles from "./reset.module.css";
import PasswordVisibilityIcon from "components/PasswordVisibilityIcon/PasswordVisibilityIcon";
import { useParams } from "react-router-dom";
import { resetPassword } from "internalApi";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";

function Reset() {
  const { user_id, token } = useParams();

  const [showPassword, setShowPassword] = useState([]);

  const [isReseted, setIsReseted] = useState(false);
  const [resetedText, setResetedText] = useState(null);

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

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        setIsReseted(true);
        await resetPassword(user_id, token, values.password);
        setResetedText("Password has been reseted.");
      } catch (err) {
        setIsReseted(false);
        bag.setErrors({ general: err.response.data });
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className="row no-gutters justify-content-center rounded p-5 form">
        <div className="col-12 d-flex justify-content-center">
          <p className="h3 line-height-1 mb-4">Reset Password</p>
        </div>
        {resetedText ? (
          <div className="h4 d-flex justify-content-center align-items-center">
            {resetedText}
          </div>
        ) : (
          <div className="col-auto w-100">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                {formik.errors.general && (
                  <div className="alert alert-danger">
                    {formik.errors.general}
                  </div>
                )}
                <label className="mb-1" name="password">
                  Password
                </label>
                <div
                  className={clsx(
                    "bg-white border rounded d-flex justify-content-center align-items-center",
                    formik.errors.password &&
                      formik.touched.password &&
                      "border-danger error-border"
                  )}
                >
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password"
                    id="resetPassword"
                    type="password"
                    className={clsx(
                      "form-control form-control-lg border-0 rounded"
                    )}
                    placeholder="Enter your password"
                  />
                  <div className="mr-2">
                    <PasswordVisibilityIcon
                      key="1"
                      id="resetPassword"
                      showPassword={showPassword}
                      handleShowPassword={handleShowPassword}
                    />
                  </div>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-1 text-danger">{formik.errors.password}</p>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  disabled={isReseted}
                  type="submit"
                  className="btn btn-dark"
                >
                  {isReseted ? (
                    <div className="pl-4 pr-4">
                      <ClipLoader size="12px" color="white" />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reset;
