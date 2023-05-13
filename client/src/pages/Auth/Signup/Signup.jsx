import React, { useContext, useEffect } from "react";
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

              <label name="name">Your Name</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                type="text"
                className={clsx(
                  formik.errors.name && formik.touched.name
                    ? "border border-danger error-border"
                    : null,
                  "form-control form-control-lg"
                )}
                placeholder="Enter your name"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="mt-1 text-danger">{formik.errors.name}</p>
              )}
            </div>
            <div className="form-group">
              <label name="email">Email</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                type="email"
                className={clsx(
                  formik.errors.email && formik.touched.email
                    ? "border border-danger error-border"
                    : null,
                  "form-control form-control-lg "
                )}
                placeholder="Enter your email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-danger">{formik.errors.email}</p>
              )}
            </div>
            <div className="form-group">
              <label name="password">Password</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                type="password"
                className={clsx(
                  formik.errors.password && formik.touched.password
                    ? "border border-danger error-border"
                    : null,
                  "form-control form-control-lg"
                )}
                placeholder="Enter your password"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1 text-danger">{formik.errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <label name="passwordConfirm">Password Confirm</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                name="passwordConfirm"
                type="password"
                className={clsx(
                  formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm
                    ? "border border-danger error-border"
                    : null,
                  "form-control form-control-lg"
                )}
                placeholder="Re-enter your password"
              />
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
