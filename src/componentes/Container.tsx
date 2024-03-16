import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formulario } from './Formulario';
interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}


export const Container = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  useEffect(() => {
    const url = 'http://127.0.0.1:8000/api/tasks';
    const token = '6|v2nEXTx4QJ4m52oedMuRSPelaW8pQSdmWfU3XGtp';//localStorage.getItem('token');  aqui reemplazo por el token 

    // Incluye el token en los headers de la solicitud
    axios.get<Tarea[]>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Asegúrate de que la respuesta cumple con la estructura esperada
        setTareas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos desde el backend:', error);
      });
  }, []); // Este useEffect se ejecuta una vez al montar el componente

  useEffect(() => {
    // Este efecto se ejecutará cada vez que el estado 'tareas' se actualice
    console.log(tareas);
  }, [tareas]);

  // verificar estado de tarea : 
  const traducirEstado = (estado: number) => {
    switch (estado) {
      case 1: return 'Terminada';
      case 2: return 'Pendiente';
      case 3: return 'Anulada';
      default: return 'Desconocido';
    }
  };

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <div className="content-wrapper">

      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">

              {/* /.card */}
              <div className="card">
                <div className="card-header border-0">
                  <h3 className="card-title">Tareas</h3>
                  <div className="card-tools">
                    {/* Botón para abrir el formulario de nueva tarea */}
                    <button onClick={abrirModal} className="btn btn-primary btn-sm">
                      Agregar nueva tarea
                    </button>
                    {/* Otros botones o herramientas */}
                  </div>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-striped table-valign-middle">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                        <th>Fecha creación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tareas.map((tarea) => (
                        <tr key={tarea.id}>
                          <td>{tarea.title}</td>
                          <td>{tarea.description}</td>
                          <td>{traducirEstado(tarea.completed)}</td>
                          <td>{tarea.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* /.card */}
            </div>
            {/* /.col-md-6 */}

            {/* /.col-md-6 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content */}

      <Formulario mostrarModal={mostrarModal} cerrarModal={cerrarModal} />
    </div>


  )
}
