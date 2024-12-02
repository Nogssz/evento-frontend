// src/components/Eventos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Snackbar,
  Avatar,
  Box,
  Grid
} from '@mui/material';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [comentarios, setComentarios] = useState({});
  const [novoComentario, setNovoComentario] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('is_admin') === 'true';
    setIsAdmin(adminStatus);

    const fetchEventos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/eventos');
        setEventos(res.data);
      } catch (error) {
        setMensagem('Erro ao carregar eventos');
        setSnackbarOpen(true);
      }
    };

    fetchEventos();
  }, []);

  const handleInscrever = async (eventoId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensagem('Você precisa estar logado para se inscrever em um evento');
      setSnackbarOpen(true);
      return;
    }

    try {
      const usuarioId = JSON.parse(atob(token.split('.')[1])).id;
      await axios.post(
        'http://localhost:5000/eventos/inscrever',
        { eventoId, usuarioId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensagem('Inscrição realizada com sucesso!');
      setSnackbarOpen(true);
      setEventos((prevEventos) =>
        prevEventos.map((evento) =>
          evento.id === eventoId ? { ...evento, inscrito: true } : evento
        )
      );
    } catch (error) {
      setMensagem('Erro ao se inscrever: ' + error.response?.data?.error);
      setSnackbarOpen(true);
    }
  };

  const handleComentarioChange = (eventoId, comentario) => {
    setNovoComentario({ ...novoComentario, [eventoId]: comentario });
  };

  const handleComentar = async (eventoId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensagem('Você precisa estar logado para comentar em um evento');
      setSnackbarOpen(true);
      return;
    }

    try {
      const usuarioId = JSON.parse(atob(token.split('.')[1])).id;
      const comentario = novoComentario[eventoId];

      await axios.post(
        'http://localhost:5000/eventos/comentar',
        { eventoId, usuarioId, comentario },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensagem('Comentário adicionado com sucesso!');
      setSnackbarOpen(true);
      setNovoComentario({ ...novoComentario, [eventoId]: '' });
      fetchComentarios(eventoId);
    } catch (error) {
      setMensagem('Erro ao comentar: ' + error.response?.data?.error);
      setSnackbarOpen(true);
    }
  };

  const fetchComentarios = async (eventoId) => {
    try {
      const res = await axios.get(`http://localhost:5000/eventos/${eventoId}/comentarios`);
      setComentarios((prevComentarios) => ({
        ...prevComentarios,
        [eventoId]: res.data
      }));
    } catch (error) {
      setMensagem('Erro ao carregar comentários');
      setSnackbarOpen(true);
    }
  };

  const handleDeletar = async (eventoId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMensagem('Você precisa estar logado para deletar um evento');
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/eventos/${eventoId}/deletar`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem('Evento deletado com sucesso!');
      setSnackbarOpen(true);
      setEventos(eventos.filter((evento) => evento.id !== eventoId));
    } catch (error) {
      setMensagem('Erro ao deletar evento: ' + error.response?.data?.error);
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    eventos.forEach((evento) => {
      fetchComentarios(evento.id);
    });
  }, [eventos]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Eventos Disponíveis</Typography>
      <Grid container spacing={3}>
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <Grid item xs={12} sm={6} md={4} key={evento.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{evento.nome}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {evento.descricao}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Data: {evento.data}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Vagas: {evento.vagas}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleInscrever(evento.id)}
                  >
                    {evento.inscrito ? 'Inscrito' : 'Inscrever-se'}
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeletar(evento.id)}
                    >
                      Deletar
                    </Button>
                  )}
                </CardActions>
                <Box p={2}>
                  <Typography variant="h6">Comentários</Typography>
                  {comentarios[evento.id] && comentarios[evento.id].length > 0 ? (
                    comentarios[evento.id].map((comentario) => (
                      <Box display="flex" alignItems="center" key={comentario.id}>
                        <Avatar>{comentario.usuario_nome.charAt(0)}</Avatar>
                        <Box ml={2}>
                          <Typography variant="body2">
                            <strong>{comentario.usuario_nome}:</strong> {comentario.comentario}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography>Nenhum comentário ainda.</Typography>
                  )}
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={novoComentario[evento.id] || ''}
                    onChange={(e) => handleComentarioChange(evento.id, e.target.value)}
                    placeholder="Deixe um comentário"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleComentar(evento.id)}
                  >
                    Comentar
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>Nenhum evento disponível.</Typography>
        )}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={mensagem}
      />
    </Box>
  );
}

export default Eventos;
