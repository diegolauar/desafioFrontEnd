import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nome || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    } else if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const response = await api.post('/api/account/createuser', {
        nome,
        email,
        password,
        confirmPassword,
        active,
      });

      if (response.status === 201) {
        console.log('Cadastro realizado com sucesso!');
        navigate('/login'); // Redireciona para a tela de login
      }
    } catch (err) {
      setError('Erro ao realizar o cadastro. Tente novamente.');
      console.error(err);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h5">Cadastro</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Cadastrar
        </Button>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleGoHome} sx={{ mt: 2 }}>
          Voltar para Home
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
