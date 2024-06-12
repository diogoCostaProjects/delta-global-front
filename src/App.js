import React from 'react';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import ListaAlunos from './ListaAlunos';
import AdicionarAluno from './AdicionarAluno';
import AdicionarUsuario from './AdicionarUsuario';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EditarAluno from './EditarAluno';
import EditarFoto from './EditarFoto';


const navCuston = {
  'padding': '20px'
};


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light ${navCuston}">
            <Link className="navbar-brand" to="/">Sistema de alunos</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adicionar-usuario">Novo usuário</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/lista">Lista de Alunos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adicionar">Cadastrar Aluno</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Routes>
            <Route path="/lista" element={<ListaAlunos />} />
            <Route path="/" element={<Login />} />
            <Route path="/adicionar" element={<AdicionarAluno />} />
            <Route path="/adicionar-usuario" element={<AdicionarUsuario />} />
            <Route path="/editar-aluno/:id" element={<EditarAluno />} />
            <Route path="/editar-foto/:id" element={<EditarFoto />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
