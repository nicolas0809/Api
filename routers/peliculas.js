import {Router} from "express"
import {  cargarArchivo, mostrarImagen, peliculasDelete, peliculasGet, peliculasGetBuscar,  peliculasGetBuscarActor,  peliculasGetBuscarid,  peliculasPost, peliculasPutfoto } from "../controllers/peliculas.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarMongoId } from "../middlewares/validar-MongoId.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import HelpersPeliculas from "../helpers/peliculas.js";
import validarExistaArchivo from "../middlewares/validar-existencia-archivo.js";

const router = Router();
router.put("/agregarfoto/:id",[
    check('id').isMongoId(),
    validarCampos
],peliculasPutfoto)

//Subir imagen de la pelicula
router.get("/upload/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    validarCampos   
],mostrarImagen) //Controlador


router.post('/upload/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],  cargarArchivo )



router.get("/buscarid/:id",peliculasGetBuscarid)
router.get("/",peliculasGet);
router.get("/buscar",peliculasGetBuscar); //Buscar pelicula por titulo
router.get("/buscarActor/:id",peliculasGetBuscarActor);
router.delete("/",peliculasDelete)
router.post("/",[
    check('titulo',"El titulo es obligatoro").not().isEmpty(),
    check('titulo',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('subtitulo',"El subtitulo es obligatoro").not().isEmpty(),
    check('subtitulo',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('genero',"El genero es obligatoro").not().isEmpty(),
    check('genero',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('descripcion',"Debe tener menos de 2000 caracteres").isLength({max:2000}),
    check('descripcion',"La descripcion es Obligatoria").not().isEmpty(),
    check('duracion',"Es Obligatorio").not().isEmpty(),
    check('imagen',"Debe tener menos de 1000 caracteres").isLength({max:1000}),
    check('actores').custom(validarMongoId),
    validarCampos
],peliculasPost);


export default router;