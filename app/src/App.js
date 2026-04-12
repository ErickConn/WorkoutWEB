import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';

// Importações das páginas
import Login from './pages/login/login';
import Registro from './pages/registro/registro';
import Home from './pages/home/Home';
import Perfil from './pages/perfil/Perfil';
import UpdateUsuario from './pages/perfil/updatePerfil';
import Treino from './pages/treino';
import Exercicio from './pages/exercicio';
import Progresso from './pages/progresso/Progresso';
import Selecttreino from './pages/select-treino/select-treino';
import BibliotecaTreino from './pages/biblioteca-treino';
import BibliotecaExercicios from './pages/biblioteca-exercicio/biblioteca'; 
import Plano from './pages/plano';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route path='/' element={<Login />} />
        <Route path='/registro' element={<Registro />} />

        {/* ROTAS PRIVADAS */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path='/update-usuario' element={<ProtectedRoute><UpdateUsuario /></ProtectedRoute>} />
        
        <Route path="/treino" element={<ProtectedRoute><Treino /></ProtectedRoute>} />
        <Route path='/exercicio/:id' element={<ProtectedRoute><Exercicio /></ProtectedRoute>} />
        <Route path='/select-treino' element={<ProtectedRoute><Selecttreino /></ProtectedRoute>} />
        <Route path='/biblioteca-treino' element={<ProtectedRoute><BibliotecaTreino /></ProtectedRoute>} />
        <Route path='/biblioteca-exercicio' element={<ProtectedRoute><BibliotecaExercicios /></ProtectedRoute>} />
        
        <Route path="/progresso" element={<ProtectedRoute><Progresso /></ProtectedRoute>} />
        <Route path='/plano' element={<ProtectedRoute><Plano /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;