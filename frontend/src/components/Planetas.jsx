import { useState, useEffect } from 'react';
import { planetasService } from '../services/api';
import './Personajes.css';

const Planetas = () => {
    const [planetas, setPlanetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPlanetas();
    }, []);

    const loadPlanetas = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await planetasService.getAll();
            setPlanetas(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar los planetas');
            console.error('Error al cargar planetas:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Cargando planetas...</div>;
    }

    return (
        <div className="personajes-container">
            <h1>Planetas de Dragon Ball</h1>
            {error && <div className="error-message">{error}</div>}
            
            {planetas.length === 0 ? (
                <p className="no-data">No hay planetas disponibles</p>
            ) : (
                <div className="personajes-grid">
                    {planetas.map((planeta) => (
                        <div key={planeta._id} className="personaje-card">
                            {planeta.image && (
                                <img 
                                    src={planeta.image} 
                                    alt={planeta.name || 'Planeta'}
                                />
                            )}
                            <h3>{planeta.name || 'Sin nombre'}</h3>
                            {planeta.description && (
                                <p className="description">{planeta.description}</p>
                            )}
                            <div className="personaje-info">
                                {planeta.poblation !== undefined && (
                                    <p><strong>Población:</strong> {planeta.poblation.toLocaleString()}</p>
                                )}
                                {planeta.color && (
                                    <p><strong>Color:</strong>
                                        <span 
                                            style={{ 
                                                color: planeta.color,
                                                marginLeft: '5px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {planeta.color}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Planetas;
