import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  editPost
} from "../controllers/postsControllers.js";

const router = express.Router();

router.route("/").get(getPosts);
router.route("/new-post").post(createPost);
router.route("/:id").get(getPostById).delete(deletePost).patch(editPost);

export default router;
