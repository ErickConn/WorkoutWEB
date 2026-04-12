import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components/perfil.module.css';
import { fetchTreinoList } from '../../redux/treino/actions'; // Action já estava aqui
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
    const navigate = useNavigate();
    
    // REDUX STATES
    const biometria = useSelector(state => state.biometriaReducer.biometria);
    const loading = useSelector(state => state.biometriaReducer.loading);
    
    // 1. Puxando a lista de treinos do Redux (verifique se o nome do seu reducer é treinoReducer mesmo)
    const treinos = useSelector(state => state.treinoReducer?.treinos || []); 

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // 2. Dispara as ações para buscar Biometria E Treinos quando a tela carrega
    useEffect(() => {
        dispatch(fetchBiometriaList());
        dispatch(fetchTreinoList()); 
    }, [dispatch]);

    // Sempre que a lista de 'biometria' atualizar do Redux, procuramos nosso usuário
    useEffect(() => {
        const emailLogado = localStorage.getItem('usuarioLogadoEmail');
        
        if (emailLogado && biometria?.length > 0) {
            const usuarioEncontrado = biometria.find(
                (item) => item.usuario.email === emailLogado
            );
            setMeusDados(usuarioEncontrado);
        }
    }, [biometria]); 

    const handleDeletePerfilBiometrico = () => {
    if (meusDados) {
        // Verifica se é admin ANTES de deletar
        if (meusDados.usuario.role === 'admin') {
            alert('Ação bloqueada: O perfil de Administrador Mestre não pode ser deletado.');
            return; // Cancela a função na hora
        }

        // Se não for admin, segue a vida normal:
        dispatch(deleteBiometria(meusDados.id));
        localStorage.removeItem('usuarioLogadoEmail'); 
        navigate('/'); 
    }
}
    const handleupdatePerfil = () => {
        navigate('/update-usuario'); 
    };
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
                <OffCanvasNavBar /> 
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

    // 3. Procura qual plano de treino está com ativo: true
    const planoAtivo = treinos.find(treino => treino.ativo === true);

    // Renderização Principal 
    return (
        <>
            <OffCanvasNavBar />

            <main className={styles.containerPerfil}>
                <button onClick={handleDeletePerfilBiometrico} className={styles.btnDeletar}>
                    Deletar Perfil
                </button>
                <button onClick={handleupdatePerfil} className={styles.btnEditar}>
                    Editar Dados de Conta
                </button>

                <UserProfileCard
                    fotoUsuario={fotoUsuario}
                    handleUploadFoto={handleUploadFoto}
                    nome={meusDados.usuario.nome}
                    email={meusDados.usuario.email}
                    iniciais={meusDados.usuario.nome.substring(0, 2).toUpperCase()} 
                    sexo={meusDados.usuario.perfil_biometrico.sexo} 
                    role={meusDados.usuario.role}
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
                    
                    // 4. Aqui nós usamos o nome do plano ativo. Se não tiver nenhum ativo, mostra um texto padrão
                    planoAtual={planoAtivo ? planoAtivo.titulo : "Nenhum plano ativo"} 
                />

                <button onClick={handleShowModal} className={styles.btnEditar}>
                    Editar Perfil
                </button>
            </main>

            <Home show={showModal} handleClose={handleCloseModal} />
        </>
    );
}