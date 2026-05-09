import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components/perfil.module.css';
import { fetchPlanoList } from '../../redux/planos/slices';
import { fetchBiometriaList, deleteBiometria } from '../../redux/Biometria/slice';
import { fetchUsersList, deleteUser } from '../../redux/user/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import OffCanvasNavBar from '../../components/OffCanvasNavBar';
import BiometricsCard from './components/biometriccard.js';
import { AlertContext } from '../../context/AlertContext';
import PlanDetailsCard from './components/plandetailscard.js';
import ExperienceCard from './components/experiencecard.js';
import UserProfileCard from './components/userprofilecard.js';
import Spinner from '../../components/Spinner.js';
import Home from '../home/Home.js';

export default function Perfil() {
    const [fotoUsuario, setFotoUsuario] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [meusDados, setMeusDados] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const currentUser = useSelector(state => state.userReducer.currentUser);
    const biometria = useSelector(state => state.biometriaReducer.biometria);
    const loading = useSelector(state => state.biometriaReducer.loading || state.userReducer.loading);
    const treinosData = useSelector(state => state.planosReducer?.planos);
    const treinos = treinosData || [];
    
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => {
        if (currentUser?.role === 'admin') {
            showAlert('Ação bloqueada: O perfil de Administrador Mestre não pode ser deletado.', 'warning');
            return;
        }
        setShowDeleteModal(true);
    };

    useEffect(() => {
        dispatch(fetchUsersList());
        dispatch(fetchBiometriaList()); // Adicionado de volta para carregar do DB no refresh
        dispatch(fetchPlanoList());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser && biometria?.length > 0) {
            const userId = currentUser._id || currentUser.id;
            const dadosBiometria = biometria.find(item => item.id_usuario === String(userId));
            setMeusDados(dadosBiometria || null);
        } else {
            setMeusDados(null);
        }
    }, [currentUser, biometria]);

    const confirmDelete = () => {
        if (currentUser) {
            const userId = currentUser._id || currentUser.id;
            dispatch(deleteUser(userId));
            if (meusDados && meusDados._id) {
                dispatch(deleteBiometria(meusDados._id));
            }
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

    if (loading) {
        return (
            <div className={styles.mainContainer}>
                <OffCanvasNavBar />
                <Spinner className="vh-100" />
            </div>
        );
    }

    if (!meusDados || !meusDados.perfil_biometrico) {
        return (
            <>
                <OffCanvasNavBar />
                <main className={styles.containerPerfil} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--on-surface)' }}>
                        Olá, {currentUser?.nome || 'Atleta'}!
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

    const userIdAtivo = currentUser?._id || currentUser?.id;
    const planoAtivo = treinos.find(
        (treino) => treino.ativo === true || (userIdAtivo && treino.activeUserIds?.[userIdAtivo])
    );

    return (
        <>
            <OffCanvasNavBar />

            <main className={styles.containerPerfil}>
                <button onClick={handleShowDeleteModal} className={styles.btnDeletar}>
                    Deletar Perfil
                </button>
                <button onClick={handleupdatePerfil} className={styles.btnEditar}>
                    Editar Dados de Conta
                </button>

                <UserProfileCard
                    fotoUsuario={fotoUsuario}
                    handleUploadFoto={handleUploadFoto}
                    nome={currentUser.nome}
                    email={currentUser.email}
                    iniciais={currentUser.nome?.substring(0, 2).toUpperCase() || 'US'}
                    sexo={meusDados.perfil_biometrico?.sexo}
                    role={currentUser.role}
                />

                <BiometricsCard
                    peso={meusDados.perfil_biometrico?.peso_kg}
                    altura={meusDados.perfil_biometrico?.altura_cm}
                    idade={meusDados.perfil_biometrico?.idade}
                    tmb={meusDados.analise_metabolica?.tmb_kcal || 0}
                />

                <ExperienceCard
                    nivel={meusDados.experiencia_usuario?.nivel_experiencia}
                    descricao="Baseado em seu perfil biométrico e histórico de treinos"
                />

                <PlanDetailsCard
                    nivelAtividade={meusDados.perfil_biometrico?.nivel_atividade}

                    planoAtual={planoAtivo ? planoAtivo.titulo : "Nenhum plano ativo"}
                />

                <button onClick={handleShowModal} className={styles.btnEditar}>
                    Editar Perfil
                </button>
            </main>

            <Home show={showModal} handleClose={handleCloseModal} />
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title style={{ color: '#ef4444', fontWeight: 'bold' }}>
                        ⚠️ Confirmar Exclusão
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ paddingTop: '0' }}>
                    <p>Tem certeza de que deseja deletar seu perfil biométrico de forma permanente?</p>
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginBottom: '0' }}>
                        Esta ação não pode ser desfeita. Todos os seus dados de metabolismo e experiência serão perdidos e você será redirecionado para a tela de login.
                    </p>
                </Modal.Body>

                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Sim, Deletar Perfil
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}