import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email girin.")
    .required("Girilmesi zorunludur."),
  password: yup
    .string()
    .min(5, "Parolanız en az 5 karakterden oluşmalıdır.")
    .required("Girilmesi zorunludur."),
});

export default validations;
