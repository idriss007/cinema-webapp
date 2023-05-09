const BadRequestError = require("../../../errors/BadRequestError");
const UnAuthenticatedError = require("../../../errors/UnAuthenticatedError");
const Comment = require("../../models/comment");
const { tryCatch } = require("../../utils/tryCatch");

const CreateComment = tryCatch(async (req, res) => {
  const { movie_id, body, parent_id } = req.body;

  if (!movie_id || !body) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const newComment = await (
    await Comment.create({
      user: req.payload.user_id,
      movie_id,
      body,
      parentId: parent_id,
    })
  ).populate("user");

  return res.send(newComment);
});

const DeleteComment = tryCatch(async (req, res) => {
  const { comment_id } = req.body;

  if (!comment_id || !req.payload.user_id) {
    throw new BadRequestError("Wrong or missing data.");
  }

  //Get comment
  const foundComment = await Comment.findById(comment_id);
  //Check is delete request came from the comment writer
  if (req.payload.user_id !== foundComment.user.toString()) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  await Comment.deleteMany({ parentId: comment_id });
  const response = await Comment.findByIdAndDelete(comment_id).populate("user");
  return res.send(response);
});

const UpdateComment = tryCatch(async (req, res) => {
  const { comment_id, body } = req.body;

  if (!comment_id || !body) {
    throw new BadRequestError("Wrong or missing data.");
  }

  //Get comment
  const foundComment = await Comment.findById(comment_id);
  //Check is delete request came from the comment writer
  if (req.payload.user_id !== foundComment.user.toString()) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  foundComment.body = body;
  foundComment.updatedAt = new Date();
  const updatedComment = await foundComment.save();
  res.send(updatedComment);
});

const GetAllComments = tryCatch(async (req, res) => {
  const { movie_id } = req.params;

  if (!movie_id) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const comments = await Comment.find({ movie_id }).populate("user");
  return res.send(comments);
});

const GetUserComments = tryCatch(async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const comments = await Comment.find({ user: user_id }).populate("user");
  return res.send(comments);
});

module.exports = {
  CreateComment,
  DeleteComment,
  UpdateComment,
  GetAllComments,
  GetUserComments,
};
