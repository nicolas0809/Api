import Personas from "../models/personas.js"


const helpersPersonas={
    existePersonaById : async (id) => {
        const existe = await Personas.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeEmail :async(email) => {
        
            const existe = await Personas.findOne({ email });
        
        if (existe ) {
            throw new Error(`El email ya está registrado`)
        }
        
       
    },

    

}
export default helpersPersonas;