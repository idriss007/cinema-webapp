import React, { useContext } from "react";
import styles from "./signup.module.css";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { createRatingList, fetchRegister, postList } from "../../../api";
import AuthContext from "../../../context/AuthContext";

function Signup() {

    const { login } = useContext(AuthContext);

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
                
                const registerResponse = await fetchRegister({ name: values.name, email: values.email, password: values.password });
                console.log(registerResponse);
                login(registerResponse);

                //Kullanıcı kayıt olunca default olarak her kullanıcıya watchlist listesi oluştur.
                const watchlist = await postList({
                    name: "Watchlist",
                    user: registerResponse.user._id
                });

                const ratedMoviesList = await postList({
                    name: "Rated",
                    user: registerResponse.user._id
                });

                const ratingList = await createRatingList({
                    user_id: registerResponse.user._id
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
            <div className={styles.headTitleContainer}><p className={styles.headTitle}>Sign Up</p></div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">

                    {formik.errors.general && <div className="alert alert-danger">{formik.errors.general}</div>}

                    <label className={styles.lbl} name="name">Your Name</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name="name" type="text" className="form-control form-control-lg" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label className={styles.lbl} name="email">Email</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" type="email" className="form-control form-control-lg" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label className={styles.lbl} name="password">Password</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" type="password" className="form-control form-control-lg" placeholder="Enter your password" />
                </div>
                <div className="form-group">
                    <label className={styles.lbl} name="passwordConfirm">Password Confirm</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} name="passwordConfirm" type="password" className="form-control form-control-lg" placeholder="Re-enter your password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;