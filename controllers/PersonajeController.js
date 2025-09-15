// importamos el archivo molde para declarar los controladores del modelo
import  PersonajeModel from '../models/PersonajeModel.js';

    const NewCharacter = async (request, response) => {
        const {name, image, description, kiBase,FavoriteFood} = request.body;
        const Character = new PersonajeModel({name, image, description, kiBase,FavoriteFood});
        if(name){
            const data=  await Character.save();
            response.status(201).json({msg: "Personaje creado exitosamente!", data})
        }else{
            response.status(404).json({"msg":"Por favor rellene el campo correctamente."})
        }
    }

    const CharacterList = async (request, response) => {
        const Character= await PersonajeModel.find()
        response.json(Character);
    }

    const FindCharacter = async (request, response) => {
        const id = request.params.id
        const Character = await PersonajeModel.findById(id)
        if(Character){
            response.status(201).json({"msg":"personajes encontrado", Character})
        }else{
            response.status(401).json({"msg" :" No se encontro el personaje requerido por el ID"})
        }
    }

    const DeleteCharacter = async (request, response ) => {
        const id = request.params.id
        const Character = await PersonajeModel.findByIdAndDelete(id)
        if(Character){
            response.status(201).json({msg:"Personaje Eliminaco Correctamente"})
        }else{
            response.status(401).json({"msg" :" Personaje No encontrado "})
        }
    }

    const UpdateCHaracterID = async (request, response ) =>{
        const id = request.params.id;
        const body = request.body;

        const Character = await PersonajeModel.findByIdAndUpdate(id, body)
        if ( Character){
            response.status(201).json({"msj" : "Personaje actualizado"})
        }else{
            response.status(401).json({"msj" : "No se pudo actualizar el personaje, intente nuevamente"})

        }
    }

    export {
        
        NewCharacter, CharacterList, FindCharacter, DeleteCharacter, UpdateCHaracterID
    }
