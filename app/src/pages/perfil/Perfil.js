import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './components/perfil.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { fetchBiometriaList } from '../../redux/Biometria/actions';
import { useDispatch,useSelector } from 'react-redux';
import OffCanvasNavBar from '../../components/OffCanvasNavBar';
import BiometricsCard from './components/biometriccard.js';
import PlanDetailsCard from './components/plandetailscard.js';
import ExperienceCard from './components/experiencecard.js';
import UserProfileCard from './components/userprofilecard.js';


export default function Perfil() {
    const [fotoUsuario, setFotoUsuario] = useState(null);
    const dispatch = useDispatch();
    const biometria = useSelector(state => state.biometriaReducer.biometria);
  console.log('Dados biométricos:', biometria);
  useEffect(() => {
      dispatch(fetchBiometriaList());
    }, [dispatch]);
    if (!biometria || biometria.length === 0) {
    return (
      <div className={styles.container}>
        <p>Carregando dados biométricos...</p>
      </div>
    );
  }
   
    const handleUploadFoto = (event) => {
        const arquivo = event.target.files[0];
        if (arquivo) {
            setFotoUsuario(URL.createObjectURL(arquivo));
        }
    };
    const usuario = biometria[0]?.usuario;
    const perfilBiometrico = usuario?.perfil_biometrico;

    return (
       <>
            <OffCanvasNavBar />
            
            <main className={styles.containerPerfil}>
                
                <UserProfileCard 
                    fotoUsuario={fotoUsuario}
                    handleUploadFoto={handleUploadFoto}
                    nome={usuario?.nome}
                    email="roberto.carlos@email.com" 
                    iniciais="RC" 
                />

                <BiometricsCard 
                    peso={perfilBiometrico?.peso_kg}
                    altura={perfilBiometrico?.altura_cm}
                    idade={perfilBiometrico?.idade}
                    tmb={usuario?.analise_metabolica?.tmb_kcal}
                />

                <ExperienceCard 
                    nivel="Intermediário" 
                    descricao="Baseado em seu perfil biométrico e histórico de treinos"
                />

                <PlanDetailsCard 
                    objetivo="Hipertrofia Muscular"
                    nivelAtividade="Moderado (3-5x/semana)"
                    planoAtual="ABC - Intermediário"
                />

                <Link to='/Home' className={styles.btnEditar}>
                    Editar Perfil
                </Link>

            </main>
        </>
    );
}