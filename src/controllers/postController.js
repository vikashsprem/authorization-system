const Post = require("../models/postModel");

const postController = {
  // Get all feeds
  getAllPosts: async (req, res) => {
    console.log("get all posts");
    try {
      const posts = await Post.find().populate("author", "email");
      console.log(posts);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching feeds" });
    }
  },

  // Create new feed
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = await Post.create({
        title,
        content,
        author: req.user.id,
      });
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating post" });
    }
  },

  // Delete feed
  deletePost: async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
      res.status(200).json({ message: "post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  },
};

module.exports = postController;
