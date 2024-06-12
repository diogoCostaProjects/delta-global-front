import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AdicionarUsuario = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const response = await axios.post('http://localhost:8080/auth/register', { username: username, password: password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setMessage('Usuário adicionado!');
            navigate('/');
        }
        catch (error) {
            console.error('Erro:', error);
            setMessage('Erro ao conectar-se à API.');
        }
    };

    return (
        <div className='container'>
            <h3>Cadastro de usuário</h3>
            <form onSubmit={handleSubmit}>
                <div className="container mt-5">

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Usuário"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                    />
                    <button onClick={handleSubmit}>Cadastrar</button>
                </div>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default AdicionarUsuario;
