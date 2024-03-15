import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function validateObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("El id no es válido");
    return res.status(400).json({ error: error.message });
  }
}

async function handleNotFoundError(res, msg) {
  const error = new Error(msg);
  return res.status(404).json({ error: error.message });
}

const uniqueId = () =>
  Date.now().toString(32) + Math.random().toString(32).substring(2);

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}


export {
  validateObjectId,
  handleNotFoundError,
  uniqueId,
  encryptPassword,
  comparePassword,
  generateJWT
};
