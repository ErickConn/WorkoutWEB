import React, { useState, useEffect } from 'react'; 
import styles from './components/perfil.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { fetchBiometriaList } from '../../redux/Biometria/actions';
import { useDispatch, useSelector } from 'react-redux';
import OffCanvasNavBar from '../../components/OffCanvasNavBar';
import BiometricsCard from './components/biometriccard.js';
import PlanDetailsCard from './components/plandetailscard.js';
import ExperienceCard from './components/experiencecard.js';
import UserProfileCard from './components/userprofilecard.js';
import Home from '../home/Home.js'; 

export default function Perfil() {
    const [fotoUsuario, setFotoUsuario] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

    // 2. Crie as funções para abrir e fechar o modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    if (!biometria[0].usuario.perfil_biometrico) {
        return (
            <>
            <OffCanvasNavBar />
            <div className={styles.container}>
                <p>Dados biométricos não encontrados. Por favor, complete seu perfil.</p>
            </div>
            <button onClick={handleShowModal} className={styles.btnEditar}>
                    Editar Perfil
                </button> 
                </>
        );
    }


    return (
        <>
            <OffCanvasNavBar />
            
            <main className={styles.containerPerfil}>
                
                <UserProfileCard 
                    fotoUsuario={fotoUsuario}
                    handleUploadFoto={handleUploadFoto}
                    nome={biometria[0]?.usuario.nome}
                    email="roberto.carlos@email.com" 
                    iniciais="RC" 
                />

                <BiometricsCard 
                    peso={biometria[0]?.usuario.perfil_biometrico.peso_kg}
                    altura={biometria[0]?.usuario.perfil_biometrico.altura_cm}
                    idade={biometria[0]?.usuario.perfil_biometrico.idade}
                    tmb={biometria[0]?.usuario.analise_metabolica.tmb_kcal}
                />

                <ExperienceCard 
                    nivel="Intermediário" 
                    descricao="Baseado em seu perfil biométrico e histórico de treinos"
                />

                <PlanDetailsCard 
                    objetivo="Hipertrofia Muscular"
                    nivelAtividade={biometria[0]?.usuario.perfil_biometrico.nivel_atividade}
                    planoAtual="ABC - Intermediário"
                />

                {/* 3. Troque o <Link> por um <button> que chama a função de abrir o modal */}
                <button onClick={handleShowModal} className={styles.btnEditar}>
                    Editar Perfil
                </button>

            </main>

            {/* 4. Adicione o Modal no final do componente, passando as props */}
            <Home
                show={showModal} 
                handleClose={handleCloseModal} 
            />
        </>
    );
}