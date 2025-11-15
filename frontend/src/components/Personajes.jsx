import { useState, useEffect } from 'react';
import { personajesService } from '../services/api';
import './Personajes.css';

const Personajes = () => {
    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPersonajes();
    }, []);

    const loadPersonajes = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await personajesService.getAll();
            setPersonajes(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar los personajes');
            console.error('Error al cargar personajes:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Cargando personajes...</div>;
    }

    return (
        <div className="personajes-container">
            <h1>Personajes de Dragon Ball</h1>
            {error && <div className="error-message">{error}</div>}
            
            {personajes.length === 0 ? (
                <p className="no-data">No hay personajes disponibles</p>
            ) : (
                <div className="personajes-grid">
                    {personajes.map((personaje) => (
                        <div key={personaje._id} className="personaje-card">
                            {personaje.image && (
                                <img 
                                    src={personaje.image} 
                                    alt={personaje.name || 'Personaje'}
                                />
                            )}
                            <h3>{personaje.name || 'Sin nombre'}</h3>
                            {personaje.description && (
                                <p className="description">{personaje.description}</p>
                            )}
                            <div className="personaje-info">
                                {personaje.kiBase !== undefined && (
                                    <p><strong>Ki Base:</strong> {personaje.kiBase}</p>
                                )}
                                {personaje.FavoriteFood && (
                                    <p><strong>Comida Favorita:</strong> {personaje.FavoriteFood}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Personajes;
