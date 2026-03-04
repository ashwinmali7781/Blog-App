// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     summary: { type: String, required: true, trim: true },
//     content: { type: String, required: true },
//     tags: [{ type: String }],
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model('Post', postSchema);


import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
