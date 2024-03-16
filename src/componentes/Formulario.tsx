import React, { useState } from 'react';
import axios from 'axios';

interface Formulario {
    mostrarModal: boolean;
    cerrarModal: () => void;
}

  
export const Formulario: React.FC<Formulario> = ({mostrarModal, cerrarModal }) => {
    const [title, setTitulo] = useState('');
    const [description, setDescripcion] = useState('');
    const [completed, setEstado] = useState('1'); // Valor por defecto del select

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Realizar la solicitud POST al backend de Laravel
            const token = '6|v2nEXTx4QJ4m52oedMuRSPelaW8pQSdmWfU3XGtp'; //localStorage.getItem('token');SE GUARDARA CON EL TOKEN DE USAURIOLOGEADO e incluir tu token real
            const response = await axios.post('http://127.0.0.1:8000/api/tasks', {
            title,
            description,
            completed,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Manejar la respuesta del servidor si es necesario
            console.log('Respuesta del servidor:', response.data);
            window.location.reload();
            // Cerrar el modal después de enviar el formulario exitosamente
            cerrarModal();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    return (
        <div className={`modal fade ${mostrarModal ? 'show' : ''}`} style={{ display: mostrarModal ? 'block' : 'none' }} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden={!mostrarModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Agregar Nueva Tarea</h5>
                            <button type="button" className="close" onClick={cerrarModal}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="titulo">Título:</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    value={title}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion">Descripción:</label>
                                <textarea
                                    id="descripcion"
                                    value={description}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    className="form-control"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="estado">Estado:</label>
                                <select
                                    id="estado"
                                    value={completed}
                                    onChange={(e) => setEstado(e.target.value)}
                                    className="form-control"
                                    required
                                >
                                    <option value="1">Terminada</option>
                                    <option value="2">Pendiente</option>
                                    <option value="3">Anulada</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


