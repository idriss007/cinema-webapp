import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Enter a valid email.").required("Required field."),
});

export default validations;
