import React, { useState } from 'react';
import axios from 'axios';

export const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login1', {
        email,
        password
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Almacenar el token en localStorage
      setIsLoggedIn(true);
      // Redirigir a la página de inicio o al panel de control
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // Corregido aquí
      if (!token) {
        console.error('No hay token de acceso almacenado');
        return;
      }
      // Enviar una solicitud al backend para cerrar la sesión
      const response = await axios.post('http://127.0.0.1:8000/api/auth/logout1', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        // Redirigir a la página de inicio o a la página de inicio de sesión
        setIsLoggedIn(false);
      } else {
        console.error('Error al cerrar sesión:', response.data.error);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div>
      {!isLoggedIn ? ( // Mostrar campos de inicio de sesión solo si el usuario no está autenticado
        <div>
          <h2>Iniciar sesión</h2>
          <input type="text" placeholder="Nombre de usuario" value={email} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      ) : (
        <div>
          <p>¡Ya estás autenticado!</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};
