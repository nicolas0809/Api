import Comentario from "../models/comentarios.js"

const comentarioPost=async(req,res)=>{
    const {usuario,pelicula,comentarios}=req.body
    const comentario=new Comentario({usuario,pelicula,comentarios}) 
    await comentario.save()
    res.json({
        "msg":"Comentario realizado con éxito!"
    })
}   
const comentarioGet=async(req,res)=>{
    const comentarios=await Comentario.find()
    .populate("usuario","nombre")
    .populate("pelicula","titulo")
    res.json({
        comentarios
    })
}
const comentariogetBuscar=async(req,res)=>{
    const {nombre}=req.query
    const comentarios = await Comentario.find({nombre})
    res.json({
        comentarios
    })
}
export {comentarioPost,comentarioGet,comentariogetBuscar}