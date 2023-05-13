import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import clsx from "clsx";

//Local Api
// import { postList } from "../../api";
import { postList } from "internalApi";

//Validation Schema
import validationSchema from "./validations";

//Stylesheet
import styles from "./createnewlist.module.css";

function CreateNewList() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      listName: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const { newList } = await postList({
          name: values.listName,
        });
        navigate("/list/" + newList._id);
      } catch (error) {
        bag.setErrors({ general: error.response.data });
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className="row no-gutters justify-content-center rounded p-5 form">
        <div className="col-12 d-flex justify-content-center">
          <p className="h3 line-height-1 mb-4 justify-content-center d-flex">
            Create New List
          </p>
        </div>
        <div className="col-auto w-100">
          <form
            action="http://localhost:3000/profile"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-group">
              {formik.errors.general && (
                <div className="alert alert-danger">
                  {formik.errors.general}
                </div>
              )}
              <label for="listName" className="mb-1">
                List Title
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.listName}
                type="text"
                name="listName"
                className={clsx(
                  formik.errors.listName &&
                    formik.touched.listName &&
                    "border border-danger error-border",
                  "form-control"
                )}
                placeholder="Enter list name"
              />
              {formik.errors.listName && formik.touched.listName && (
                <p className="mt-1 text-danger">{formik.errors.listName}</p>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" class="btn btn-dark font-weight-bold">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewList;
