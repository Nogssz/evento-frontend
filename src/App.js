// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Eventos from './components/Eventos';
import CriarEvento from './components/CriarEvento';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Box, CssBaseline } from '@mui/material';

const theme = createTheme();

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Atualiza o valor de isAdmin sempre que a página é recarregada
    const adminStatus = localStorage.getItem('is_admin');
    console.log("Valor do is_admin no localStorage:", adminStatus); // Log para verificar o valor atual
    if (adminStatus === 'true') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []); // Executa apenas ao montar o componente

  // Função para verificar mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const adminStatus = localStorage.getItem('is_admin');
      console.log("Storage mudou, valor do is_admin:", adminStatus); // Log para verificar as mudanças no armazenamento
      if (adminStatus === 'true') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/registrar">
                Registrar
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/eventos">
                Eventos
              </Button>
              {isAdmin && (
                <Button color="inherit" component={Link} to="/criar-evento">
                  Criar Evento
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/criar-evento" element={<CriarEvento />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
