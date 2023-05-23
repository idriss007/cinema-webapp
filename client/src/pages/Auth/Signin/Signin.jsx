import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import clsx from "clsx";

//Validation Schema
import validationSchema from "./validation";

//Local Api
// import { fetchLogin } from "../../../api";
import { fetchLogin } from "internalApi";

//Context
import AuthContext from "context/AuthContext";

//React Icons
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

//Stylesheet
import styles from "../Signup/signup.module.css";
import PasswordVisibilityIcon from "components/PasswordVisibilityIcon/PasswordVisibilityIcon";
import { Link } from "react-router-dom";

function Signin({ title }) {
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState([]);

  useEffect(() => {
    document.title = title;
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin(values);
        console.log(loginResponse);
        login(loginResponse);
      } catch (err) {
        bag.setErrors({ invalidLogin: err.response.data });
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
          <p className="h3 line-height-1 mb-4">Sign In</p>
        </div>
        <div className="col-auto w-100">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              {formik.errors.invalidLogin && (
                <div className="alert alert-danger">
                  {formik.errors.invalidLogin}
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
            <div className="form-group">
              <div className="d-flex justify-content-between mb-1">
                <label>Password</label>
                {/* <Link>Forgot your password?</Link> */}
              </div>
              <div
                className={clsx(
                  "border rounded bg-white d-flex justify-content-center align-items-center",
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
                  id="loginPassword"
                  className={clsx(
                    "form-control form-control-lg border-0 rounded"
                  )}
                  type="password"
                  placeholder="Enter your password"
                />
                <div className="mr-2">
                  <PasswordVisibilityIcon
                    key="1"
                    id="loginPassword"
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
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>
            <div className="d-flex justify-content-center mt-2">
              You don't have an account?
              <Link reloadDocument={true} to="/signup" className="ml-1">
                Sign Up!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
