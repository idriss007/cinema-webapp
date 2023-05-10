import * as yup from "yup";

const validations = yup.object().shape({
  listName: yup
    .string()
    .trim()
    .min(1, "List name must be at least 1 character.")
    .required("Required"),
});

export default validations;
