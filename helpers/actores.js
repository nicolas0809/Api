import Actores from "../models/actores.js";

const HelpersActores={
    existeNombre:()=>{
        return async (req,res,next)=>{
            const existe = await Actores.findOne({nombre:req.body.nombre});

            if (existe){
                return res.status(401).json({msg:`El nombre del actor ya existe`})
            }
        }
    },
    existePersonajes:()=>{
        return async (req,res,next)=>{
            const existe = await Actores.findOne({personajes:req.body.personajes});

            if (existe){
                return res.status(401).json({msg:`El id del  personaje ya existe`})
            }
        }
    },

}
export default HelpersActores