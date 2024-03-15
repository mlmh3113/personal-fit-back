import express from "express";
import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  verifyToken,
  login,
  user,
} from "../controllers/studentsControllers.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getStudents);

router.route("/new-student").post(createStudent);

router.route("/verify/:token").get(verifyToken);

router.route("/login").post(login);

router.route("/user").get(authMiddleware, user);

router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);


export default router;
