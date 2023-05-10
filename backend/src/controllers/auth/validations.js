const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(5).required(),
});

const registerSchema = Joi.object({
  name: Joi.string().trim().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(5).required(),
  passwordConfirm: Joi.ref("password"),
});

exports.validateLogin = validator(loginSchema);
exports.validateRegister = validator(registerSchema);
