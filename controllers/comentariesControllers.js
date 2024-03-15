import Comentary from "../models/Comentaries.js";

const createComentary = async (req, res) => {
  const { comentary_body, author } = req.body;
  try {
    const newComentary = new Comentary({ comentary_body, author });
    await newComentary.save();
    res.json(newComentary);
  } catch {
    const error = new Error("Error al crear el comentario");
    return res.status(400).json({ msg: error.message });
  }
};

const getComentaries = async (req, res) => {
  try {
    const comentaries = await Comentary.find();
    res.json(comentaries);
  } catch {
    const error = new Error("Error al obtener los comentarios");
    return res.status(400).json({ msg: error.message });
  }
};


export { createComentary, getComentaries }

