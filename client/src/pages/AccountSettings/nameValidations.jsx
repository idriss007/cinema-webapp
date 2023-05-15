import * as yup from "yup";

const passwordValidations = yup.object().shape({
  newName: yup
    .string()
    .trim()
    .min(5, "Name must be at least 5 characters.")
    .required("Required field."),
  currentPassword: yup
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters.")
    .required("Required field."),
});

export default passwordValidations;
