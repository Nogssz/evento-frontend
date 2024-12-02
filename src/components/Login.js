import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, senha });
      const { token } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      // Decodificar o token para verificar se é administrador
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.is_admin) {
        localStorage.setItem('is_admin', 'true');
      } else {
        localStorage.setItem('is_admin', 'false');
      }

      setMensagem('Login realizado com sucesso!');
      setSnackbarOpen(true);

      // Redirecionar para a página de eventos
      navigate('/eventos');
    } catch (error) {
      setMensagem('Erro ao fazer login: ' + error.response?.data?.error);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Senha"
        variant="outlined"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={mensagem}
      />
    </Box>
  );
}

export default Login;
