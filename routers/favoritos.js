import {Router} from "express"
import { favoritosDelete, favoritosget, favoritosPost } from "../controllers/favoritos.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
;

const router = Router();

router.delete("/",favoritosDelete);
router.get("/listarid/:id",[
    check('id').isMongoId(),
    validarCampos
],favoritosget)
router.post("/",[
    check('usuario',"el usuario es obligatorio").not().isEmpty(),
    check('pelicula',"la pelicula debe ser obligatoria").not().isEmpty(),
    validarCampos,
],favoritosPost)

export default router;