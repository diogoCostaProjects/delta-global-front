// ProfilePictureUpload.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function EditarFoto() {
    
    const { token } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');
    const { id } = useParams();


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage('Por favor, selecione um arquivo.');
            return;
        }

        const formData = new FormData();

        formData.append('id', id);
        formData.append('image', selectedFile);
        

        try {
            const response = await axios.post('http://localhost:8080/aluno/novafoto', formData, {
                headers: {
                    
                    Authorization: `Bearer ${token}`
                },
            });
            setMessage('Foto de perfil atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer upload da foto:', error);
            setMessage('Erro ao atualizar a foto de perfil.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Alterar Foto de Perfil Do Aluno</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="profilePicture">Escolha uma nova foto de perfil:</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="profilePicture"
                        onChange={handleFileChange}
                    />
                </div>
                {preview && (
                    <div className="mb-3">
                        <h4>Pré-visualização:</h4>
                        <img src={preview} alt="Pré-visualização" className="img-thumbnail" />
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Atualizar Foto</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default EditarFoto;
