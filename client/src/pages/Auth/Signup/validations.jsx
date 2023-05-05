import * as yup from "yup";

const validations = yup.object().shape({
  name: yup
    .string()
    .min(5, "Name must be at least 5 characters.")
    .required("Required field."),
  email: yup.string().email("Enter a valid email.").required("Required field."),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters.")
    .required("Required field."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match.")
    .required("Required field."),
});

export default validations;
