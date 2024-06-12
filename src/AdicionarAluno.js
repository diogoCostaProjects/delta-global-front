import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AdicionarAluno = () => {
    const { token } = useContext(AuthContext);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {

                const response = await axios.post('http://localhost:8080/aluno', { nome: nome, telefone: telefone, email: email, endereco: endereco } , {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setMessage('Cadastro realizado com sucesso!');
                navigate('/lista');
        } 
        catch (error) {
                console.error('Erro:', error);
                setMessage('Erro ao conectar-se à API.');
        }
    };

    return (
        <div className='container'>
        <h3>Cadastro de aluno</h3>
        <form onSubmit={handleSubmit}>
            <div >
                <label htmlFor="nome">Nome:</label>
                <input
                    className='form-control'
                    type="text"
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    className='form-control'
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="telefone">Telefone:</label>
                <input
                    className='form-control'
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="endereco">Endereço:</label>
                <input
                    className='form-control'
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    required
                />
            </div>
            <button className='btn btn-primary' type="submit">Cadastrar</button>
            {message && <p>{message}</p>}
        </form>
        </div>
    );
};

export default AdicionarAluno;
