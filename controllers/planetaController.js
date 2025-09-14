
import PlanetaModel from '../models/PlanetaModel.js'


    const NewPlanet = async (request, response) => {
        const {name, image, description, poblation, color} = request.body
        const Planet = new PlanetaModel({name, image, description, poblation, color})
        const data= await Planet.save()
        response.status(201).json({"msg" : "ok", data})
    }

    const ListPlanet = async (request, response) => {
        const Planet = await PlanetaModel.find()
        response.json(Planet)
    }

    const FindPlanet = async (request, response) => {
        const id = request.params.id;
        const Planet = await PlanetaModel.findById(id)
        if(Planet){
            response.status(201).json({"msg" :"Planeta encontrado", Planet})
        }else{
            response.status(401).json({"msg" :"Planeta no localizado, intenta nuevamente"})
        }
    }


const DeletePlanet = async (request, response) => { 
    const id = request.params.id;
        const Planet = await PlanetaModel.findByIdAndDelete(id)
        if(Planet){
            response.status(201).json({"msg" :"Planeta eliminado correctamente"})
        }else{
            response.status(401).json({"msg" :"Planeta no localizado, intenta nuevamente"})
        }
}


const UpdatePlanet = async (request, response) => {
    const id = request.params.id
    const body = request.body

    const planet = await PlanetaModel.findByIdAndUpdate(id, body)
    if(planet){
        response.status(201).json({"msg" : "Planeta Actualizado correctamente"})
    }else{
        response.status(401).json({"msg":"No se pudo actualizar el planeta"})
    }
}

export {

    ListPlanet, FindPlanet, DeletePlanet, UpdatePlanet, NewPlanet
}