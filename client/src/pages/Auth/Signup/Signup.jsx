import React, { useContext } from "react";
import styles from "./signup.module.css";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchRegister } from "../../../api";
import AuthContext from "../../../context/AuthContext";

function Signup() {

    const { login } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            try {
                const registerResponse = await fetchRegister({email: values.email, password: values.password});
                console.log(registerResponse);
                login(registerResponse);
            } catch (e) {
                
            }
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.headTitleContainer}><p className={styles.headTitle}>Sign Up</p></div>
            <form onSubmit={formik.handleSubmit}>
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
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} name="passwordConfirm" type="password" className="form-control form-control-lg" placeholder="Enter your password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;