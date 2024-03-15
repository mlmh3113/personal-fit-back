import mongoose from "mongoose";


const comentarySchema = new mongoose.Schema({
    comentary_body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    createdAt: { type: Date, default: Date.now },
});


const Comentary = mongoose.model("Comentary", comentarySchema);
export default Comentary;