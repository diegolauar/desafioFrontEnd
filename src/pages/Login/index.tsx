import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import api from '../../services/api';

// Tipagem para os dados de login
interface LoginData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useNavigate();

    // Função de login
    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: LoginData = { email, password };

        try {
            const response = await api.post('/api/account/loginuser', data);

            // Salvando dados no localStorage
            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            // Redirecionando para a página de alunos
            history('/alunos');
        } catch (error) {
            alert('Erro no login, verifique suas credenciais!');
        }
    };

    // Função de redirecionamento para a página de cadastro
    const handleRegisterRedirect = () => {
        history('/register'); // Redireciona para a página de cadastro
    };

    return (
        <Container maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={login} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Senha"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>

                {/* Botão para redirecionar para a página de cadastro */}
                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handleRegisterRedirect}
                >
                    Não tem uma conta? Cadastre-se
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
