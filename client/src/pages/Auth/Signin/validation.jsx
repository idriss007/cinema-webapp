import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Enter a valid email.").required("Required field."),
  password: yup
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters.")
    .required("Required field."),
});

export default validations;
