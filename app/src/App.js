import './App.css'
import { 
  Routes,
  Route
 } from 'react-router-dom';
import Treino from './pages/treino'
import Home from './pages/home/Home';
import TreinoLivre from './pages/treino-livre';
import Exercicio from './pages/exercicio';
import Progresso from './pages/progresso/Progresso';
import Selecttreino from './pages/select-treino';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import BibliotecaTreino from './pages/biblioteca-treino';
import { buscarPlanos } from './redux/treino/actions';
import Perfil from './pages/perfil/Perfil';  

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buscarPlanos());
},[dispatch]);
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
        <Route path='/home' element={<Home></Home>}></Route>
      </Routes>
    </>
  );
}

export default App;
