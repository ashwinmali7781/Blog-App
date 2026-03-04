// import { Router } from "express";
// import {
//   createPost,
//   deletePost,
//   getPostById,
//   getPosts,
//   updatePost,
// } from "../controllers/postController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = Router();

// router.get("/", getPosts);
// router.get("/:id", getPostById);
// router.post("/", protect, createPost);
// router.put("/:id", protect, updatePost);
// router.delete("/:id", protect, deletePost);

// export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getPosts,
  getPostById,  
  createPost,
  updatePost,
  deletePost
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);  

router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
