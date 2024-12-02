// src/components/CriarEvento.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CriarEvento() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [vagas, setVagas] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleCriarEvento = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensagem('Você precisa estar logado como administrador para criar um evento');
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/eventos/criar',
        { nome, descricao, data, vagas },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem('Evento criado com sucesso!');
      setSnackbarOpen(true);
      navigate('/eventos');
    } catch (error) {
      setMensagem('Erro ao criar evento: ' + error.response?.data?.error);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Criar Evento
      </Typography>
      <TextField
        fullWidth
        label="Nome do Evento"
        variant="outlined"
        margin="normal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        fullWidth
        label="Descrição"
        variant="outlined"
        margin="normal"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <TextField
        fullWidth
        label="Data"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        margin="normal"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <TextField
        fullWidth
        label="Número de Vagas"
        variant="outlined"
        margin="normal"
        value={vagas}
        onChange={(e) => setVagas(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCriarEvento}
      >
        Criar Evento
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

export default CriarEvento;
