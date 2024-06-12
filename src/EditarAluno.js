import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EditarAluno = () => {

    const { token } = useContext(AuthContext);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;

            try {
                const url = `http://localhost:8080/aluno/${id}`;

                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setNome(response.data.nome);
                setEmail(response.data.email);
                setTelefone(response.data.telefone);
                setEndereco(response.data.endereco);
            }
            catch (error) {
            }

        };

        fetchData();
    }, [token]);



    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const url = `http://localhost:8080/aluno/${id}`;

            const response = await axios.put(url, { nome: nome, telefone: telefone, email: email, endereco: endereco }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            navigate(`/editar-aluno/${id}`);
            setMessage('Dados Atualizados');
        }
        catch (error) {
            console.error('Erro:', error);
        }
    };



    return (
        <div className='container'>
            <h3>Editar aluno</h3>
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
                <button className='btn btn-primary' type="submit">Salvar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditarAluno;
