// src/components/Home.js
import React from 'react';
import { Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box p={4} textAlign="center">
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao Sistema de Gerenciamento de Eventos Acadêmicos
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Este sistema permite que alunos se inscrevam, avaliem e sugiram novos eventos acadêmicos no campus. Administradores podem gerenciar eventos e garantir uma boa experiência para todos.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/eventos">
            Ver Eventos
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" component={Link} to="/registrar">
            Registrar-se
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
