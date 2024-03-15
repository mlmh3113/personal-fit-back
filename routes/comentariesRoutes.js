import express from "express";
import {createComentary, getComentaries} from "../controllers/comentariesControllers.js";


const router = express.Router();


router.route("/").get(getComentaries);
router.route("/new-comentary").post(createComentary);


export default router