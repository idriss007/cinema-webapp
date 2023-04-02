import * as yup from "yup";

const validations = yup.object().shape({
  name: yup.string().min(5).required(),
  email: yup
    .string()
    .email("Geçerli bir email girin.")
    .required("Girilmesi zorunludur."),
  password: yup
    .string()
    .min(5, "Parolanız en az 5 karakterden oluşmalıdır.")
    .required("Girilmesi zorunludur."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Parolalar uyuşmuyor")
    .required("Girilmesi zorunludur."),
});

export default validations;
