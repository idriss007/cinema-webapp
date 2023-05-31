import * as yup from "yup";

const validations = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters.")
    .required("Required field."),
});

export default validations;
