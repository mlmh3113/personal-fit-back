import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    post_body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    createdAt: { type: Date, default: Date.now },
    comentaries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comentary" }],
    image: { type: String },
});


const Posts = mongoose.model("Post", postSchema);
export default Posts