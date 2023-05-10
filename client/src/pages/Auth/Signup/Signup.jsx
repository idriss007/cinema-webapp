import React, { useContext, useEffect } from "react";
import styles from "./signup.module.css";
import { useFormik } from "formik";
import validationSchema from "./validations";
// import { createRatingList, fetchRegister, postList } from "../../../api";
import {
  createRatingList,
  fetchRegister,
  postList,
} from "../../../internalApi";
import AuthContext from "../../../context/AuthContext";

function Signup({ title }) {
  const { login } = useContext(AuthContext);

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
        login(registerResponse);

        //Kullanıcı kayıt olunca default olarak her kullanıcıya watchlist listesi oluştur.
        const watchlist = await postList({
          name: "Watchlist",
        });

        const ratedMoviesList = await postList({
          name: "Rated",
        });

        const ratingList = await createRatingList({
          user_id: registerResponse.user._id,
        });

        console.log(watchlist);
        console.log(ratedMoviesList);
        console.log(ratingList);
      } catch (err) {
        bag.setErrors({ general: err.response.data });
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.headTitleContainer}>
        <p className={styles.headTitle}>Sign Up</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          {formik.errors.general && (
            <div className="alert alert-danger">{formik.errors.general}</div>
          )}

          <label className={styles.lbl} name="name">
            Your Name
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
            type="text"
            className={
              "form-control form-control-lg " +
              (formik.errors.name && formik.touched.name
                ? "border border-danger error-border"
                : null)
            }
            placeholder="Enter your name"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="mt-1 text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-group">
          <label className={styles.lbl} name="email">
            Email
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            type="email"
            className={
              "form-control form-control-lg " +
              (formik.errors.email && formik.touched.email
                ? "border border-danger error-border"
                : null)
            }
            placeholder="Enter your email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="mt-1 text-danger">{formik.errors.email}</p>
          )}
        </div>
        <div className="form-group">
          <label className={styles.lbl} name="password">
            Password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            type="password"
            className={
              "form-control form-control-lg " +
              (formik.errors.password && formik.touched.password
                ? "border border-danger error-border"
                : null)
            }
            placeholder="Enter your password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="mt-1 text-danger">{formik.errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label className={styles.lbl} name="passwordConfirm">
            Password Confirm
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
            name="passwordConfirm"
            type="password"
            className={
              "form-control form-control-lg " +
              (formik.errors.passwordConfirm && formik.touched.passwordConfirm
                ? "border border-danger error-border"
                : null)
            }
            placeholder="Re-enter your password"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <p className="mt-1 text-danger">{formik.errors.passwordConfirm}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
