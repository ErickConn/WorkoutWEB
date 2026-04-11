import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { 
  Routes,
  Route
 } from 'react-router-dom';
import Treino from './pages/treino'
import Home from './pages/home/Home';
import Exercicio from './pages/exercicio';
import Progresso from './pages/progresso/Progresso';
import Selecttreino from './pages/select-treino/select-treino';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import BibliotecaTreino from './pages/biblioteca-treino';
import Perfil from './pages/perfil/Perfil';
import Plano from './pages/plano';
import BibliotecaExercicios from './pages/biblioteca-exercicio/biblioteca'; 
import Login from './pages/login/login';
import Registro from './pages/registro/registro';

function App() {
  return (
    <>
      <Routes>
        <Route path="/perfil" element={<Perfil/>}></Route>
        <Route path="/treino" element={<Treino />}></Route>
        <Route path="/progresso" element={<Progresso/>}></Route>
        <Route path='/exercicio/:id' element={<Exercicio/>}></Route>
        <Route path='/select-treino' element={<Selecttreino/>}></Route>
        <Route path='/biblioteca-treino' element={<BibliotecaTreino></BibliotecaTreino>}></Route>
        <Route path='/biblioteca-exercicio' element={<BibliotecaExercicios></BibliotecaExercicios>}> </Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/plano' element={<Plano></Plano>}></Route>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/registro' element={<Registro></Registro>}></Route>
      </Routes>
    </>
  );
}

export default App;
