import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Checkbox, FormControlLabel } from '@mui/material';
import api from '../../services/api';

// Tipagem para os dados do aluno
interface Aluno {
    id: number;
    nome: string;
    email: string;
    password: string;
    active: boolean; // Novo campo
}

const NovoAluno: React.FC = () => {
    const { alunoId } = useParams();
    const history = useNavigate();

    const [id, setId] = useState<number | string>(''); 
    const [nome, setNome] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [active, setActive] = useState<boolean>(true); // Novo estado para o campo active

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        if (alunoId !== '0') {
            loadAluno();
        }
    }, [alunoId]);

    const loadAluno = async () => {
        try {
            const response = await api.get(`/api/alunos/${alunoId}`, authorization);
            const aluno: Aluno = response.data;

            setId(aluno.id);
            setNome(aluno.nome);
            setPassword(aluno.password);
            setEmail(aluno.email);
            setActive(aluno.active); // Definindo o valor do campo active
        } catch (error) {
            alert('Erro ao carregar o aluno: ' + error);
            history('/alunos');
        }
    };

    const saveOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: Aluno = { nome, password, email, active } as Aluno; // Incluindo o campo active no objeto

        try {
            if (alunoId === '0') {
                await api.post('/api/alunos', data, authorization);
            } else {
                await api.put(`/api/alunos/${alunoId}`, data, authorization);
            }
        } catch (error) {
            alert('Erro ao salvar o aluno: ' + error);
        }

        history('/alunos');
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
                <Typography variant="h5" gutterBottom>
                    {alunoId === '0' ? "Incluir novo aluno" : "Atualizar aluno"}
                </Typography>
                <Link to="/alunos" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined">
                        Voltar
                    </Button>
                </Link>

                <form onSubmit={saveOrUpdate} style={{ width: '100%' }}>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                                name="active"
                            />
                        }
                        label="Ativo"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Salvar
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default NovoAluno;
