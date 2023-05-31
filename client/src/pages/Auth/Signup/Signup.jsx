import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import clsx from "clsx";

//Validation Schema
import validationSchema from "./validations";

//Local Api
// import { createRatingList, fetchRegister, postList } from "../../../api";
import { createRatingList, fetchRegister, postList } from "internalApi";

//Context
import AuthContext from "context/AuthContext";

//Styleheet
import styles from "./signup.module.css";
import PasswordVisibilityIcon from "components/PasswordVisibilityIcon/PasswordVisibilityIcon";
import { Link, useNavigate } from "react-router-dom";

function Signup({ title }) {
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          name: values.name,
          email: values.email,
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });
        console.log(registerResponse);
        login(registerResponse, true);
      } catch (err) {
        bag.setErrors({ general: err.response.data });
      }
    },
  });

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

  return (
    <div className={styles.container}>
      <div className="row no-gutters justify-content-center rounded p-5 form">
        <div className="col-12 d-flex justify-content-center">
          <p className="h3 line-height-1 mb-4">Sign Up</p>
        </div>
        <div className="col-auto w-100">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              {formik.errors.general && (
                <div className="alert alert-danger">
                  {formik.errors.general}
                </div>
              )}

              <label className="mb-1" name="name">
                Your Name
              </label>
              <div
                className={clsx(
                  "border rounded",
                  formik.errors.name &&
                    formik.touched.name &&
                    "border-danger error-border"
                )}
              >
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  name="name"
                  type="text"
                  className={clsx(
                    "form-control form-control-lg border-0 rounded"
                  )}
                  placeholder="Enter your name"
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <p className="mt-1 text-danger">{formik.errors.name}</p>
              )}
            </div>
            <div className="form-group">
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
                  type="email"
                  className={clsx(
                    "form-control form-control-lg border-0 rounded"
                  )}
                  placeholder="Enter your email"
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-danger">{formik.errors.email}</p>
              )}
            </div>
            <div className="form-group">
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
                  id="signupPassword"
                  type="password"
                  className={clsx(
                    "form-control form-control-lg border-0 rounded"
                  )}
                  placeholder="Enter your password"
                />
                <div className="mr-2">
                  <PasswordVisibilityIcon
                    key="1"
                    id="signupPassword"
                    showPassword={showPassword}
                    handleShowPassword={handleShowPassword}
                  />
                </div>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-danger">{formik.errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <label className="mb-1" name="passwordConfirm">
                Password Confirm
              </label>
              <div
                className={clsx(
                  "bg-white border rounded d-flex justify-content-center align-items-center",
                  formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm &&
                    "border-danger error-border"
                )}
              >
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  name="passwordConfirm"
                  id="signupPasswordConfirm"
                  type="password"
                  className={clsx(
                    "form-control form-control-lg border-0 rounded"
                  )}
                  placeholder="Re-enter your password"
                />
                <div className="mr-2">
                  <PasswordVisibilityIcon
                    key="2"
                    id="signupPasswordConfirm"
                    showPassword={showPassword}
                    handleShowPassword={handleShowPassword}
                  />
                </div>
              </div>
              {formik.errors.passwordConfirm &&
                formik.touched.passwordConfirm && (
                  <p className="mt-1 text-danger">
                    {formik.errors.passwordConfirm}
                  </p>
                )}
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-dark">
                Sign Up
              </button>
            </div>
            <div className="d-flex justify-content-center mt-2">
              You have an account?
              <Link reloadDocument={true} to="/signin" className="ml-1">
                Sign in!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
