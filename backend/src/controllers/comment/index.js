const Comment = require("../../models/comment");

const CreateComment = async (req, res) => {
  const { user_id, movie_id, body, parent_id } = req.body;

  if (!user_id || !movie_id || !body) {
    return res.sendStatus(400);
  }

  try {
    const newComment = await (
      await Comment.create({
        user: user_id,
        movie_id,
        body,
        parentId: parent_id,
      })
    ).populate("user");
    return res.send(newComment);
  } catch (err) {
    console.log(err);
  }
};

const DeleteComment = async (req, res) => {
  const { comment_id, user_id } = req.body;

  if (!comment_id || !user_id) {
    return res.sendStatus(400);
  }

  try {
    await Comment.deleteMany({ parentId: comment_id });
    const response = await Comment.findByIdAndDelete(comment_id).populate(
      "user"
    );
    return res.send(response);
  } catch (err) {
    console.log(err);
  }
};

const UpdateComment = async (req, res) => {
  const { comment_id, body } = req.body;

  if (!comment_id || !body) {
    return res.sendStatus(400);
  }

  try {
    const comment = await Comment.findById(comment_id);
    comment.body = body;
    comment.updatedAt = new Date();
    const updatedComment = await comment.save();
    res.send(updatedComment);
  } catch (err) {
    console.log(err);
  }
};

const GetAllComments = async (req, res) => {
  const { movie_id } = req.params;

  if (!movie_id) {
    return res.sendStatus(400);
  }

  try {
    const comments = await Comment.find({ movie_id }).populate("user");
    return res.send(comments);
  } catch (err) {
    console.log(err);
  }
};

const GetUserComments = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.sendStatus(400);
  }

  try {
    const comments = await Comment.find({ user: user_id }).populate("user");
    return res.send(comments);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  CreateComment,
  DeleteComment,
  UpdateComment,
  GetAllComments,
  GetUserComments,
};
