// importamos el archivo molde para declarar los controladores del modelo
import  PersonajeModel from '../models/PersonajeModel.js';

    const NewCharacter = async (request, response) => {
        const {name, image, description, kiBase,FavoriteFood} = request.body;
        const Character = new PersonajeModel({name, image, description, kiBase,FavoriteFood});
        const data=  await Character.save();
        response.status(201).json({msg: "save", data})
    }

    const CharacterList = async (request, response) => {
        const Character= await PersonajeModel.find()
        response.json(Character);
    }

    const FindCharacterID  = async (request, response) => {
        const id = request.params.id
        const Character = await PersonajeModel.find(id)
        if(Character){
            response.status(201).json({msg:"ok", Character})
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
        
        NewCharacter, CharacterList, FindCharacterID, DeleteCharacter, UpdateCHaracterID
    }
