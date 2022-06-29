import Favoritos from "../models/favoritos.js";

const favoritosPost= async (req,res)=>{
    const {usuario,pelicula}=req.body
    const favoritos = new Favoritos ({usuario,pelicula})
    
    await favoritos.save()

    res.json({
       favoritos
    })
}

const favoritosget = async(req,res)=>{
    const favoritos=await Favoritos.find()
    .populate("usuario","nombre")
    .populate("pelicula",["titulo","imagen"])
    
    res.json({favoritos   })
}
//Eliminar favorito
const favoritosDelete = async(req,res)=>{
    const {pelicula}=req.query
    const favoritos = await Persona.findOneAndDelete({pelicula})
   
    res.json({" pelicula eliminada de favoritos":favoritos   })
}

export {favoritosPost,favoritosDelete,favoritosget}