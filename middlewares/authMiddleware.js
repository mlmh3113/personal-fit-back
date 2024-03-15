import jwt from "jsonwebtoken";
import Students from "../models/Students.js";

const authMiddleware = async (req, res, next) => {

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Students.findById(decoded.id).select(
        "-password -verified -token -__v"
      );
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Token no válido" });
    }
  } else {
    return res.status(401).json({ error: "Token no válido o inexistente" });
  }

  
};
export default authMiddleware;
