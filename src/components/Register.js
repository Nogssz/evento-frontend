// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Snackbar } from '@mui/material';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/usuarios/registrar', { nome, email, senha });
      setMensagem('Cadastro realizado com sucesso!');
      setSnackbarOpen(true);
    } catch (error) {
      setMensagem('Erro ao registrar: ' + error.response?.data?.errors[0]?.msg);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Registrar-se
      </Typography>
      <TextField
        fullWidth
        label="Nome"
        variant="outlined"
        margin="normal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Senha"
        type="password"
        variant="outlined"
        margin="normal"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
      >
        Registrar
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

export default Register;
