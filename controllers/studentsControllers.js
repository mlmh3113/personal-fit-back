import Students from "../models/Students.js";
import {
  validateObjectId,
  handleNotFoundError,
  encryptPassword,
  comparePassword,
  generateJWT
} from "../utils/index.js";
import { sendEmailVerification } from "../emails/emailService.js";

const createStudent = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({ msg: error.message });
  }

  const { name, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    const error = new Error("El correo electrónico no es válido");
    return res.status(400).json({ msg: error.message });
  }

  const user = await Students.findOne({ email });
    if (user) {
      const error = new Error("El correo electrónico ya está en uso");
      return res.status(400).json({ msg: error.message });
    }

     if (password.trim().length < 6) {
      const error = new Error("La contraseña debe tener al menos 6 caracteres");
      return res.status(400).json({ msg: error.message });
    }


  try {
   const newUser = new Students(req.body);
    newUser.password = await encryptPassword(password);
    await newUser.save();
    sendEmailVerification(name, email, newUser.token);
    res.json({ message: "Cuenta creada exitosamente, revisa tu mail" });
  } catch {
    const error = new Error("Error al crear el usuario");
    return res.status(400).json({ msg: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch {
    const error = new Error("Error al obtener los estudiantes");
    return res.status(400).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;
  try {
    const student = await Students.findById(id);
    res.json(student);
  } catch {
    return handleNotFoundError(res, "El estudiante no existe");
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (validateObjectId(id, res)) return;

  try {
    const student = await Students.findById(id);
    if (!student) {
      return handleNotFoundError(res, "El estudiante no existe");
    } else {
      student.name = name || student.name;
      student.email = email || student.email;

      const result = await student.save();
      res.json(result);
    }
  } catch {
    const error = new Error("Error al actualizar el estudiante");
    return res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;
  const student = await Students.findById(id);
  if (!student) {
    return handleNotFoundError(res, "El estudiante no existe");
  }
  try {
    await Students.findByIdAndDelete(id);
    res.json({ message: "Estudiante eliminado" });
  } catch {
    const error = new Error("Error al eliminar el estudiante");
    return res.status(400).json({ error: error.message });
  }
};

const verifyToken = async (req, res) => {
  const {token}  = req.params;
  const student = await Students.findOne({ token });

  if (!student) {
    const error = new Error("Token inválido");
    return res.status(401).json({ error: error.message });
  }

  try {
    student.verified = true;
    student.token = "";
    await student.save();
    res.json({ message: "Token verificado correctamente" });
  } catch {
    const error = new Error("Error al verificar el token");
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const student = await Students.findOne({ email });

  if (!student) {
    const error = new Error("El correo electrónico no existe");
    return res.status(400).json({ error: error.message });
  }

  if (!student.verified) {
    const error = new Error("El correo electrónico no ha sido verificado");
    return res.status(400).json({ error: error.message });
  }

  if (!(await comparePassword(password, student.password))) {
    const error = new Error("La contraseña es incorrecta");
    return res.status(400).json({ error: error.message });
  } else {
    const token = generateJWT(student.id);
    res.status(200).json({ token });
  }

};

const user = async (req, res) => {
  const {user} = req;
  res.json(user);
}

export {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  verifyToken,
  login,
  user
};
