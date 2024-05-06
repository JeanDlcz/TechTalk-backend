import { Router } from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  removePost,
  createComment,
  getComments,
  updateComment,
  removeComment,
} from "../controllers/post.controller.js";
import { verifyToken, isModerator } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getPosts);

router.post("/", verifyToken, isModerator, createPost);

router.get("/:postId", getPost);

router.delete("/:postId", verifyToken, isModerator, removePost);

router.post("/:postId/comments", verifyToken, createComment);

router.get("/:postId/comments", verifyToken, getComments);

router.put("/:commentId/comments", verifyToken, updateComment);

router.delete("/:commentId/comments", verifyToken, removeComment);

router.put("/:postId", verifyToken, isModerator, updatePost);

export default router;
