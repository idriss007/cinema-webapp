import React, { useState } from "react";
import { useFormik } from "formik";
import clsx from "clsx";

//Validation Schema
import validationSchema from "./validation";

//Local Api
import { sendResetPasswordLink } from "internalApi";

//React Spinners
import ClipLoader from "react-spinners/ClipLoader";

//Stylesheet
import styles from "./sendlink.module.css";

function SendLink() {
  const [linkSentText, setLinkSentText] = useState(null);
  const [isLinkSent, setIsLinkSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        setIsLinkSent(true);
        await sendResetPasswordLink(values.email);
        setLinkSentText(
          "Password reset link has been sent to your email address."
        );
      } catch (err) {
        setIsLinkSent(false);
        bag.setErrors({ general: err.response.data });
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className="row no-gutters justify-content-center rounded p-5 form">
        <div className="col-12 d-flex justify-content-center">
          <p className="h3 line-height-1 mb-4">Send Reset Link</p>
        </div>
        <div className="col-auto w-100">
          {linkSentText ? (
            <div className="h4 d-flex justify-content-center align-items-center">
              {linkSentText}
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                {formik.errors.general && (
                  <div className="alert alert-danger">
                    {formik.errors.general}
                  </div>
                )}
                <label className="mb-1" name="email">
                  Email
                </label>
                <div
                  className={clsx(
                    "border rounded",
                    formik.errors.email &&
                      formik.touched.email &&
                      "border-danger error-border"
                  )}
                >
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    name="email"
                    className={clsx(
                      "form-control form-control-lg border-0 rounded"
                    )}
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-1 text-danger">{formik.errors.email}</p>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  disabled={isLinkSent}
                  type="submit"
                  className="btn btn-dark"
                >
                  {isLinkSent ? (
                    <div className="pl-4 pr-4">
                      <ClipLoader size="12px" color="white" />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendLink;
