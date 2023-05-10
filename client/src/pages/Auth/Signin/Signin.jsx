import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import styles from "../Signup/signup.module.css";
import validationSchema from "./validation";
// import { fetchLogin } from "../../../api";
import { fetchLogin } from "../../../internalApi";
import AuthContext from "../../../context/AuthContext";

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
      <div className={styles.headTitleContainer}>
        <p className={styles.headTitle}>Login</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          {formik.errors.invalidLogin && (
            <div className="alert alert-danger">
              {formik.errors.invalidLogin}
            </div>
          )}
          <label className={styles.lbl} name="email">
            Email
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            className={
              "form-control form-control-lg " +
              (formik.errors.email && formik.touched.email
                ? "border border-danger error-border"
                : null)
            }
            type="email"
            placeholder="Enter your email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="mt-1 text-danger">{formik.errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label className={styles.lbl}>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            className={
              "form-control form-control-lg " +
              (formik.errors.password && formik.touched.password
                ? "border border-danger error-border"
                : null)
            }
            type="password"
            placeholder="Enter your password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="mt-1 text-danger">{formik.errors.password}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Signin;
