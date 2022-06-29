import {Router} from "express"
import { actoresGetBuscar, actoresPost , actoresPutEditar, actoresDelete, actoresGetBuscarid, actoresPutfoto,} from "../controllers/actores.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarMongoId } from "../middlewares/validar-MongoId.js";

const router = Router();


router.get("/listartodo",actoresGetBuscar);
router.get("/listarid/:id",[
    check('id').custom(validarMongoId),
    validarCampos

],actoresGetBuscarid);

router.put("/:id",[
    check('id').isMongoId(),
    validarCampos

],
actoresPutEditar);

router.delete("/:id",[
    check('id').isMongoId(),
    validarCampos

],actoresDelete);

router.post("/",[
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('personajes',"El personaje es obligatoro").not().isEmpty(),
    check('personajes',"Debe tener menos de 100 caracteres").isLength({max:100}),
    
    validarCampos,

],actoresPost);

router.put("/foto/:id",[
    check('id').isMongoId(),
    validarCampos
],
actoresPutfoto);



export default router;