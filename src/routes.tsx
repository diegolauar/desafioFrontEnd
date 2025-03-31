import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Alunos from "./pages/Aluno";
import NovoAluno from "./pages/Aluno";
import Register from "./pages/Register";  // Importe o componente Register

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/alunos" element={<Alunos />} />
                <Route path="/aluno/novo/:alunoId" element={<NovoAluno />} />
                <Route path="/register" element={<Register />} /> {/* Rota para Cadastro */}
            </Routes>
        </BrowserRouter>
    );
}
