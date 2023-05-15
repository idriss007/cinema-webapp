const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const changeNameSchema = Joi.object({
  new_name: Joi.string().trim().min(5).required(),
  password: Joi.string().trim().min(5).required(),
});

const changeEmailSchema = Joi.object({
  new_email: Joi.string().email().required(),
  password: Joi.string().trim().min(5).required(),
});

const changePasswordSchema = Joi.object({
  current_password: Joi.string().trim().min(5).required(),
  new_password: Joi.string().trim().min(5).required(),
});

exports.validateNewName = validator(changeNameSchema);
exports.validateNewEmail = validator(changeEmailSchema);
exports.validateNewPassword = validator(changePasswordSchema);
