import './App.css'
import { 
  Routes,
  Route
 } from 'react-router-dom';
import Menu from './components/Menu';
import Treino from './pages/treino'
import Home from './pages/Home';
import Header from './components/Header';
import TreinoLivre from './pages/treino-livre';
import Exercicio from './pages/exercicio';
import Progresso from './pages/Progresso';
import Selecttreino from './pages/select-treino';

function App() {
  return (
    <>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/treino" element={<Treino />}></Route>
        <Route path='/treino-livre' element={<TreinoLivre/>}></Route>
        <Route path="/progresso" element={<Progresso/>}></Route>
        <Route path='/exercicio' element={<Exercicio/>}></Route>
        <Route path='/select-treino' element={<Selecttreino/>}></Route>
      </Routes>
      <Menu></Menu>
    </>
  );
}

export default App;
