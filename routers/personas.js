import {Router} from "express"
import { personaPost ,personaGetlogin, personasfotoPut, personasGetBuscarid, personaGetBuscar, personasGetBuscarNoE, personasPutEditar ,personasPutActivar,personasPutInactivar} from "../controllers/Personas.js";
import { check } from "express-validator";
import helpersPersonas from "../helpers/Personas.js";
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

//router.post("/",personaPost);

router.get("/buscarid/:id",[
    check('id').isMongoId(),
    validarCampos

],personasGetBuscarid)
router.put("/",personasfotoPut); 
router.put("/inactivar/:id",[
    check('id').isMongoId(),
    validarCampos
],personasPutInactivar); 
router.put("/activar/:id",[
    check('id').isMongoId(),
    validarCampos
],personasPutActivar); 
router.put("/editar/:id",[
    check('id').isMongoId(),
    validarCampos
],personasPutEditar); 
router.get("/login",[
    check('email',"el email es obligatorio").isEmail(),
    check('password',"la contraseña es obligatoria").not().isEmpty(),
    validarCampos
],personaGetlogin);
router.get("/b",personaGetBuscar);
router.get("/NoE",personasGetBuscarNoE);
router.post("/insertarUsuario",[
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 25 caracteres").isLength({max:25}),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener más de 8 caracteres").isLength({min:8}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(helpersPersonas.existeEmail),
    validarCampos,
],personaPost);


export default router;