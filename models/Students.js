import mongoose from "mongoose";
import {uniqueId} from "../utils/index.js";

const studentSchema = new mongoose.Schema({
  name: {type: String,trim: true,},
  surname: {type: String,},
  age: { type: Number },
  weigth: { type: Number },
  height: { type: String },
  email: { type: String, unique: true, lowercase: true, trim: true },
  goals: { type: String, trim: true },
  times_per_week: { type: String },
  medical_history: { type: String , default: "ninguno"},
  physical_illness: { type: String , default: "ninguna"},
  description: { type: String},
  has_trained:{type:String},
  type : {type: [String]},
  motivated : {type: Boolean, default: false},
  image: { type: String, 
    default: "https://res.cloudinary.com/dkoocayxp/image/upload/v1695150808/avatars-post-image/avatar_yrzni8.png"
   },



  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  token: { type: String, default: ()=> uniqueId() },
  verified : {type: Boolean, default: false},
  admin : {type: Boolean, default: false}
});

const Students = mongoose.model("Student", studentSchema);

export default Students;
