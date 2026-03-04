// import Post from '../models/Post.js';

// export const getPosts = async (_req, res) => {
//   const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
//   return res.json(posts);
// };

// export const getPostById = async (req, res) => {
//   const post = await Post.findById(req.params.id).populate('author', 'name email');

//   if (!post) {
//     return res.status(404).json({ message: 'Post not found' });
//   }

//   return res.json(post);
// };

// export const createPost = async (req, res) => {
//   const { title, summary, content, tags } = req.body;

//   const post = await Post.create({
//     title,
//     summary,
//     content,
//     tags: tags || [],
//     author: req.user.id,
//   });

//   return res.status(201).json(post);
// };

// export const updatePost = async (req, res) => {
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     return res.status(404).json({ message: 'Post not found' });
//   }

//   if (String(post.author) !== req.user.id) {
//     return res.status(403).json({ message: 'Not allowed to edit this post' });
//   }

//   post.title = req.body.title ?? post.title;
//   post.summary = req.body.summary ?? post.summary;
//   post.content = req.body.content ?? post.content;
//   post.tags = req.body.tags ?? post.tags;

//   const updatedPost = await post.save();
//   return res.json(updatedPost);
// };

// export const deletePost = async (req, res) => {
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     return res.status(404).json({ message: 'Post not found' });
//   }

//   if (String(post.author) !== req.user.id) {
//     return res.status(403).json({ message: 'Not allowed to delete this post' });
//   }

//   await post.deleteOne();
//   return res.json({ message: 'Post deleted' });
// };





// let posts = [];

// export const getPosts = (req, res) => {
//   res.json(posts);
// };

// export const createPost = (req, res) => {
//   const post = {
//     id: Date.now(),
//     title: req.body.title,
//     content: req.body.content,
//   };

//   posts.push(post);
//   res.status(201).json(post);
// };

// export const updatePost = (req, res) => {
//   const post = posts.find(p => p.id == req.params.id);

//   if (!post) return res.status(404).json({ message: "Post not found" });

//   post.title = req.body.title || post.title;
//   post.content = req.body.content || post.content;

//   res.json(post);
// };

// export const deletePost = (req, res) => {
//   posts = posts.filter(p => p.id != req.params.id);
//   res.json({ message: "Post deleted" });
// };


import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
