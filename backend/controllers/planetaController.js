
import PlanetaModel from '../models/PlanetaModel.js'


    const NewPlanet = async (request, response) => {
        const {name, image, description, poblation, Poblation, color} = request.body
        const poblationValue = Poblation || poblation
        const Planet = new PlanetaModel({name, image, description, Poblation: poblationValue, color})
        if(name){
            const data= await Planet.save()
            response.status(201).json({"msg" : "Planeta creado exitosamente!", data})
        }else{
            response.status(404).json({"msg":"Por favor rellene el campo correctamente."})
        }
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

    if (body.poblation !== undefined && !body.Poblation) {
        body.Poblation = body.poblation
        delete body.poblation
    }

    const planet = await PlanetaModel.findByIdAndUpdate(id, body)
    if(planet){
        response.status(201).json({"msg" : "Planeta Actualizado correctamente", "newPlanet":planet})
    }else{
        response.status(401).json({"msg":"No se pudo actualizar el planeta"})
    }
}

const UpgradePlanet = async (request, response) => {
    const id = request.params.id;
    const Planet = await PlanetaModel.findById(id);
    
    if(Planet){
        const pobActual = Planet.poblation || Planet.Poblation || 0;
        const nuevaPob = pobActual + 1000;
        
        const updatedPlanet = await PlanetaModel.findByIdAndUpdate(
            id,
            { poblation: nuevaPob, Poblation: nuevaPob },
            { new: true }
        );
        
        response.status(201).json({
            "msg": "Planeta mejorado",
            Planet: updatedPlanet
        });
    }else{
        response.status(401).json({"msg": "Planeta no encontrado"});
    }
}

export {

    ListPlanet, FindPlanet, DeletePlanet, UpdatePlanet, NewPlanet, UpgradePlanet
}