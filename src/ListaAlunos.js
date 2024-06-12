import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ListaAlunos = () => {

    const { token } = useContext(AuthContext);
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const avatar = {
        'height': '50px'
    };

    useEffect(() => {
        fetchData();
    }, [token]);


    const fetchData = async () => {
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:8080/aluno', {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setDados(response.data);
        } catch (error) {
            setErro(error);
        } finally {
            setLoading(false);
        }
    };


    const handleRemove = async (id) => {
        // Substitua pela URL da sua API para remover um item

        const confirmRemove = window.confirm("Você tem certeza que deseja remover este aluno?");

        if (confirmRemove) {
            try {
                const response = await axios.delete(`http://localhost:8080/aluno/${id}`, {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Aluno removido');
                fetchData();
            }
            catch (error) {
                setErro(error);
            }
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (erro) {
        return <p>Ocorreu um erro: {erro.message}</p>;
    }

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Lista de Alunos</h3>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td><img src={item.foto} style={avatar} /></td>
                            <td>{item.nome}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.endereco}</td>
                            <td>
                                <Link to={`/editar-aluno/${item.id}`}><button className='btn btn-primary'>Editar</button> </Link>
                                <button onClick={() => handleRemove(item.id)} className="btn btn-danger">Excluir</button>
                                <Link to={`/editar-foto/${item.id}`}><button className='btn btn-success'>Editar Foto</button> </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href='/adicionar'>Adicionar Aluno</a>
        </div>
    );
};

export default ListaAlunos;
