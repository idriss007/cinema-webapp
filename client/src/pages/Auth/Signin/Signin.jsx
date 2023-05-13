import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import clsx from "clsx";

//Validation Schema
import validationSchema from "./validation";

//Local Api
// import { fetchLogin } from "../../../api";
import { fetchLogin } from "internalApi";

//Context
import AuthContext from "context/AuthContext";

//Stylesheet
import styles from "../Signup/signup.module.css";

function Signin({ title }) {
  const { login } = useContext(AuthContext);

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

  return (
    <div className={styles.container}>
      <div className="row no-gutters justify-content-center rounded p-5 form">
        <div className="col-12 d-flex justify-content-center">
          <p className="h3 line-height-1 mb-4">Login</p>
        </div>
        <div className="col-auto w-100">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              {formik.errors.invalidLogin && (
                <div className="alert alert-danger">
                  {formik.errors.invalidLogin}
                </div>
              )}
              <label name="email">Email</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                className={clsx(
                  formik.errors.email && formik.touched.email
                    ? "border border-danger error-border"
                    : null,
                  "form-control form-control-lg"
                )}
                type="email"
                placeholder="Enter your email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-danger">{formik.errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                className={clsx(
                  formik.errors.password && formik.touched.password
                    ? "border border-danger error-border"
                    : null,
                  "form-control form-control-lg"
                )}
                type="password"
                placeholder="Enter your password"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-danger">{formik.errors.password}</p>
              )}
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
