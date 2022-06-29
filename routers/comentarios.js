import {Router}from "express";
import { check } from "express-validator";
import {comentarioPost,comentarioGet, comentariogetBuscar} from "../controllers/comentarios.js"
import { validarCampos } from "../middlewares/validar-campos.js";
const router=Router()

router.get("/",comentarioGet)
router.get("/buscar",comentariogetBuscar)
router.post("/",[
    check('usuario',"el usuario es obligatorio").not().isEmpty(),
    check('pelicula',"el usuario es obligatorio").not().isEmpty(),
    check('comentarios',"el usuario es obligatorio").not().isEmpty(),
    validarCampos,
],comentarioPost)
export default router;