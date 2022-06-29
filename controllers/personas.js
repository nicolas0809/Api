import Personas from "../models/personas.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";
//Agregar persona
const personaPost = async (req, res) => {
  const { email, password, nombre } = req.body;
  let salt = bcryptjs.genSaltSync(10);
  const persona = new Personas({ email, password, nombre });
  persona.password = bcryptjs.hashSync(password, salt);
  await persona.save();

  res.json({
    msg: "registro exitoso",
  });
};
// loguin
const personaGetlogin = async (req, res) => {
  let { email, password } = req.query;

  const persona = await Personas.findOne({ email });

  if (!persona) res.json({ msg: "Usuario no encontrado" });
  else {
    const validPassword = bcryptjs.compareSync(password, persona.password);

    if (validPassword) {
      const token = await generarJWT(persona.id);
      res.json({
        persona,
        token,
      });
    } else {
      res.json({ msg: "Usuario no encontrado" });
    }
  }
};
const personasfotoPut = async (req, res) => {
  const { id } = req.params;
  const { foto } = req.body;
  const personaFoto = await Personas.findByIdAndUpdate(id, { foto });
  res.json({
    msg: "actualizacion exitosa",
  });
};
const personasGetBuscarid = async (req, res) => {
  const { id } = req.params;
  const persona = await Personas.findById(id);
  res.json({
    persona,
  });
};
const personaGetBuscar = async (req, res) => {
  const persona = await Personas.find({});
  res.json({
    persona,
  });
};
const personasGetBuscarNoE = async (req, res) => {
  const { value } = req.query;
  const persona = await Personas.find({
    $or: [
      { nombre: new RegExp(value, "i") },
      { email: new RegExp(value, "i") },
    ],
  });
  res.json({
    persona,
  });
};
const personasPutEditar = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, estado, foto } = req.body;
  const persona = await Personas.findByIdAndUpdate(id, {
    nombre,
    email,
    password,
    estado,
    foto,
  });
  res.json({
    msg: "actualizacion de datos exitosa",
  });
};
const personasPutActivar = async(req,res)=>{
    const {id}=req.params
   
    const persona = await Personas.findByIdAndUpdate(id,{estado:1})
    res.json({
       msg: "activacion de estado exitosa"

    })
}
const personasPutInactivar = async(req,res)=>{
    const {id}=req.params
   
    const persona = await Personas.findByIdAndUpdate(id,{estado:0})
    res.json({
       msg: "activacion de estado exitosa"

    })
}

export {
  personaGetlogin,personaPost,personasfotoPut,personasGetBuscarid,personaGetBuscar,personasGetBuscarNoE,personasPutEditar,personasPutActivar,personasPutInactivar
};
