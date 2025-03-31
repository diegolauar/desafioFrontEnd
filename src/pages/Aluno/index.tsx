import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IconButton, Button, TextField, Typography, Card, CardContent, CardActions } from '@mui/material';
import api from '../../services/api';

interface Aluno {
    id: number;
    nome: string;
    email: string;
    password: string;
    active: boolean;
}

const Alunos = () => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [filtro, setFiltro] = useState<Aluno[]>([]);
    const navigate = useNavigate();

    const email = localStorage.getItem('email') || '';
    const token = localStorage.getItem('token') || '';

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        api.get('/api/alunos', authorization)
            .then(response => setAlunos(response.data))
            .catch(error => console.error('Erro ao buscar alunos:', error));
    }, []);

    const searchAlunos = (searchValue: string) => {
        setSearchInput(searchValue);
        if (searchValue !== '') {
            const dadosFiltrados = alunos.filter(aluno =>
                Object.values(aluno).join('').toLowerCase().includes(searchValue.toLowerCase())
            );
            setFiltro(dadosFiltrados);
        } else {
            setFiltro(alunos);
        }
    };


    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    const editAluno = (id: number) => {
        navigate(`/aluno/novo/${id}`);
    };

    const deleteAluno = async (id: number) => {
        if (window.confirm(`Deseja excluir o aluno de id: ${id}?`)) {
            try {
                await api.delete(`/api/Alunos/${id}`, authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            } catch (error) {
                alert('Erro ao excluir o aluno.');
            }
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h6">Bem-vindo, <strong>{email}</strong>!</Typography>
                <Button variant="contained" color="primary" component={Link} to='/aluno/novo/0'>Novo Aluno</Button>
                 <Button style={{ width: '20px', padding: '10px' }} type="submit" variant="contained" onClick={logout} color="error" fullWidth>Logout</Button>
      
            </header>
            
            <TextField
                fullWidth
                variant="outlined"
                placeholder='Filtrar por nome...'
                value={searchInput}
                onChange={(e) => searchAlunos(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            
            <Typography variant="h5" gutterBottom>Relação de alunos</Typography>
            
            {/* Renderizando a lista de alunos com base no filtro ou na lista completa */}
            {(searchInput.length > 0 ? filtro : alunos).map(aluno => (
                <Card key={aluno.id} variant="outlined" style={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Typography><strong>Nome:</strong> {aluno.nome}</Typography>
                        <Typography><strong>Email:</strong> {aluno.email}</Typography>
                        <Typography><strong>Password:</strong> {aluno.password}</Typography>
                        <Typography><strong>Active:</strong> true</Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={() => editAluno(aluno.id)} color="primary">
                        </IconButton>
                        <IconButton onClick={() => deleteAluno(aluno.id)} color="secondary">
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

export default Alunos;
