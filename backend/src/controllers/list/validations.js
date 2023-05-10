const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const listSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
});

exports.validateList = validator(listSchema);
