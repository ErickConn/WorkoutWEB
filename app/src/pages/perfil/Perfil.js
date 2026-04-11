import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components/perfil.module.css';
import { fetchBiometriaList, createBiometria, deleteBiometria } from '../../redux/Biometria/actions';
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
    const loading = useSelector(state => state.biometriaReducer.loading);
    console.log('Dados biométricos:', biometria);
    const navigate = useNavigate();
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        dispatch(fetchBiometriaList());
    }, [dispatch]);

    if (loading) {
        return (
            <div className={styles.container}>
                <p>Carregando dados biométricos...</p>
            </div>
        );
    }
    if (!biometria || biometria.length === 0) {
        return (
            <>

                <div className={styles.container}>
                    <p>Dados biométricos não encontrados. Por favor, complete seu perfil.</p>
                </div>
                <button onClick={handleShowModal} className={styles.btnEditar}>
                    Criar Perfil
                </button>
                <Home
                    show={showModal}
                    handleClose={handleCloseModal}
                />
            </>
        );
    }

    const handleDeletePerfilBiometrico = () => {
        const id = biometria[0].id;
        dispatch(deleteBiometria(id));
        navigate('/');
    }
    const handleUploadFoto = (event) => {
        const arquivo = event.target.files[0];
        if (arquivo) {
            setFotoUsuario(URL.createObjectURL(arquivo));
        }
    };

    



    return (
        <>
            <OffCanvasNavBar />

            <main className={styles.containerPerfil}>
                <button onClick={handleDeletePerfilBiometrico} className={styles.btnDeletar}>
                    Deletar Perfil Biométrico
                </button>

                <UserProfileCard
                    fotoUsuario={fotoUsuario}
                    handleUploadFoto={handleUploadFoto}
                    nome={biometria[0]?.usuario.nome}
                    email="roberto.carlos@email.com"
                    iniciais="RC"
                />

                <BiometricsCard
                    peso={biometria[0]?.usuario?.perfil_biometrico?.peso_kg}
                    altura={biometria[0]?.usuario?.perfil_biometrico?.altura_cm}
                    idade={biometria[0]?.usuario?.perfil_biometrico?.idade}
                    tmb={biometria[0]?.usuario?.analise_metabolica?.tmb_kcal}
                />

                <ExperienceCard
                    nivel="Intermediário"
                    descricao="Baseado em seu perfil biométrico e histórico de treinos"
                />

                <PlanDetailsCard

                    nivelAtividade={biometria[0]?.usuario?.perfil_biometrico?.nivel_atividade}
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