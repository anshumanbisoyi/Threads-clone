import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  editPost,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// Update
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/edit", verifyToken, editPost);

// Delete
router.delete("/:id/delete", verifyToken, deletePost);

export default router;
