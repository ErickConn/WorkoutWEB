import './App.css'
import { 
  Routes,
  Route
 } from 'react-router-dom';
import Treino from './pages/treino'
import Home from './pages/Home';
import TreinoLivre from './pages/treino-livre';
import Exercicio from './pages/exercicio';
import Progresso from './pages/progresso/Progresso';
import Selecttreino from './pages/select-treino';
import BibliotecaTreino from './pages/biblioteca-treino';
import Perfil from './pages/perfil/Perfil';  

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Perfil/>}></Route>
        <Route path="/treino" element={<Treino />}></Route>
        <Route path='/treino-livre' element={<TreinoLivre/>}></Route>
        <Route path="/progresso" element={<Progresso/>}></Route>
        <Route path='/exercicio/:id' element={<Exercicio/>}></Route>
        <Route path='/select-treino' element={<Selecttreino/>}></Route>
        <Route path='/biblioteca-treino' element={<BibliotecaTreino></BibliotecaTreino>}></Route>
    
      </Routes>
    </>
  );
}

export default App;
