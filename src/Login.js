import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(false);
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {

        const loginData = {
            username: username,
            password: password
        };

        axios.post('http://localhost:8080/auth/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setToken(response.data.token);
                setResult(true);
                navigate('/lista');
                console.log('Login bem-sucedido:', response.data);
            })
            .catch(error => {
                if (error.response) {
                    // O servidor respondeu com um código de status fora do alcance 2xx
                    if (error.response.status === 400) {
                        console.error('Erro 400: Requisição inválida.', error.response.data);
                    } else {
                        console.error('Erro no servidor:', error.response.data);
                    }
                } else if (error.request) {
                    // A requisição foi feita, mas nenhuma resposta foi recebida
                    console.error('Nenhuma resposta recebida:', error.request);
                } else {
                    // Algo aconteceu na configuração da requisição que acionou um erro
                    console.error('Erro na configuração da requisição:', error.message);
                }
            });

    };

    if (!result) {
        return (
            <div className="container mt-5">
                <h3>Login</h3>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }

};

export default Login;
