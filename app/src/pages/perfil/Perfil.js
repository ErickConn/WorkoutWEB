import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components/perfil.module.css';
import { fetchBiometriaList, deleteBiometria } from '../../redux/Biometria/actions';
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
    
    // Estado para guardar os dados específicos do usuário logado
    const [meusDados, setMeusDados] = useState(null); 

    const dispatch = useDispatch();
    const biometria = useSelector(state => state.biometriaReducer.biometria);
    const loading = useSelector(state => state.biometriaReducer.loading);
    const navigate = useNavigate();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Busca todos os dados quando a tela carrega
    useEffect(() => {
        dispatch(fetchBiometriaList());
    }, [dispatch]);

    // Sempre que a lista de 'biometria' atualizar do Redux, procuramos nosso usuário
    useEffect(() => {
        const emailLogado = localStorage.getItem('usuarioLogadoEmail');
        
        if (emailLogado && biometria.length > 0) {
            // Procura o usuário que tem o mesmo email salvo no Login
            const usuarioEncontrado = biometria.find(
                (item) => item.usuario.email === emailLogado
            );
            setMeusDados(usuarioEncontrado);
        }
    }, [biometria]); // Roda essa verificação toda vez que 'biometria' mudar

    const handleDeletePerfilBiometrico = () => {
        if (meusDados) {
            dispatch(deleteBiometria(meusDados.id));
            localStorage.removeItem('usuarioLogadoEmail'); // Limpa a sessão
            navigate('/login'); // Volta pro login
        }
    }

    const handleUploadFoto = (event) => {
        const arquivo = event.target.files[0];
        if (arquivo) {
            setFotoUsuario(URL.createObjectURL(arquivo));
        }
    };

    // Telas de Loading e Erro
    if (loading) {
        return (
            <div className={styles.container}>
                <p>Carregando dados biométricos...</p>
            </div>
        );
    }

    // Se o array estiver vazio ou se não encontrou o usuário logado
    if (!meusDados || !meusDados.usuario.perfil_biometrico) {
    return (
        <>
            <OffCanvasNavBar /> {/* Mantém a barra superior visível */}
            
            <main className={styles.containerPerfil} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--on-surface)' }}>
                    Olá, {meusDados?.usuario?.nome || 'Atleta'}!
                </h3>
                <p style={{ textAlign: 'center', color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
                    Seus dados biométricos ainda não foram preenchidos.
                </p>
                <button onClick={handleShowModal} className={styles.btnEditar}>
                    Criar Perfil Biométrico
                </button>
            </main>

            <Home show={showModal} handleClose={handleCloseModal} />
        </>
    );
}

    // Renderização Principal usando meusDados (e não mais biometria[0])
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
                    nome={meusDados.usuario.nome}
                    email={meusDados.usuario.email}
                    iniciais={meusDados.usuario.nome.substring(0, 2).toUpperCase()} // Pega iniciais dinâmicas
                    sexo={meusDados.usuario.perfil_biometrico.sexo} // Passa o sexo para o card
                />

                <BiometricsCard
                    peso={meusDados.usuario.perfil_biometrico.peso_kg}
                    altura={meusDados.usuario.perfil_biometrico.altura_cm}
                    idade={meusDados.usuario.perfil_biometrico.idade}
                    tmb={meusDados.usuario.analise_metabolica.tmb_kcal}
                    
                />

                <ExperienceCard
                    nivel={meusDados.usuario.experiencia_usuario.nivel_experiencia}
                    descricao="Baseado em seu perfil biométrico e histórico de treinos"
                />

                <PlanDetailsCard
                    nivelAtividade={meusDados.usuario.perfil_biometrico.nivel_atividade}
                    planoAtual="ABC - Intermediário"
                />

                <button onClick={handleShowModal} className={styles.btnEditar}>
                    Editar Perfil
                </button>
            </main>

            <Home show={showModal} handleClose={handleCloseModal} />
        </>
    );
}