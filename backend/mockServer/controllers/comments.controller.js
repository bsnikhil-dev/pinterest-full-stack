import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ pin: postId })
    .populate("user", "username img displayName")
    .sort({ createdAt: -1 });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.status(200).json(comments);
};

export const deleteAllComments = async (req, res) => {
  // console.error('Error deleting comments:');
  try {
    await Comment.deleteMany({});
    res.status(200).json({ message: 'All comments deleted successfully.' });
  } catch (error) {
    console.error('Error deleting comments:', error.message);
    res.status(500).json({ message: 'Failed to delete comments.', error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { description, pin } = req.body;
    const userId = req.userId;

    const comment = await Comment.create({
      description: description,
      pin,
      user: userId,
    });

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return res.status(201).json({
      message: 'Comment created successfully.',
      data: comment,
    });
  } catch (error) {

    return res.status(500).json({
      message: 'An error occurred while creating the comment.',
      error: error.message,
    });
  }
};