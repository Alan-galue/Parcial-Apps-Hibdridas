import PersonajeRouter from './PersonajeRouter.js';
import PlanetaRouter from './PlanetaRouter.js';
import Usuarios from './UserRouter.js'

const APIrouter  = (app)  => {
    app.use('/api/Personajes', PersonajeRouter)
    app.use('/api/Planetas', PlanetaRouter)
    app.use('/api/Usuarios', Usuarios);
}

export default APIrouter;
