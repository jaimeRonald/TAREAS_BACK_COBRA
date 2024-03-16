import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './componentes/Header';
import { Sidebar } from './componentes/Sidebar';
import { Container } from './componentes/Container';
import { Aside } from './componentes/Aside';
import { Footer } from './componentes/Footer';
import { Login } from './componentes/Login';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verificar si hay un token guardado en localStorage al cargar la aplciacions
        const token = localStorage.getItem('token');
        if (token) {
            // solicitud al servidor 
            axios.get('http://ejemplo.com/api/validateToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    // Si el token es válido, establecer el estado de autenticación en true
                    setIsLoggedIn(true);
                })
                .catch(error => {
                    // Si hay un error o el token no es válido, limpiar el token y establecer el estado de autenticación en false
                    console.error('Error al validar el token:', error);
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                });
        }
    }, []); // Se ejecuta solo una vez al cargar la aplicación

    return (
        <div className="wrapper">
            <Header />
            <Sidebar />
            <Container />
            <Aside />
            <Footer />
            {/* {isLoggedIn ? ( // Mostrar la aplicación principal si el usuario está autenticado
        <>
          <Header />
          <Sidebar />
          <Container />
          <Aside />
          <Footer />
        </>
      ) : (
        // Mostrar el formulario de inicio de sesión si el usuario no está autenticado
        <Login />
      )} */}
        </div>
    );
};

export default App;
