import './App.css';
import { 
  Routes,
  Route
 } from 'react-router-dom';
import Menu from './components/Menu';
import Treino from "./pages/Treino";
import Home from './pages/Home';
import TreinoLivre from './pages/treino-livre';
import Header from './components/Header';
import Progresso from './pages/Progresso';

function App() {
  return (
    <>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/treino" element={<Treino />}></Route>
        <Route path='/treino-livre' element={<TreinoLivre></TreinoLivre>}></Route>
        <Route path="/progresso" element={<Progresso></Progresso>}></Route>
      </Routes>
      <Menu></Menu>
    </>
  );
}

export default App;
