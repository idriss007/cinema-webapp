const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const commentSchema = Joi.object({
  body: Joi.string().trim().min(15).required(),
  movie_id: Joi.required(),
  parent_id: Joi.optional(),
});

const updateCommentSchema = Joi.object({
  body: Joi.string().trim().min(15).required(),
  comment_id: Joi.required(),
});

exports.validateComment = validator(commentSchema);
exports.validateUpdateComment = validator(updateCommentSchema);
