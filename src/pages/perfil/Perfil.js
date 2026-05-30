import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components/perfil.module.css';
import { fetchPlanoList } from '../../redux/planos/slices';
import { fetchBiometriaList, deleteBiometria } from '../../redux/Biometria/slice';
import { fetchCurrentUser, deleteUser, updateUser } from '../../redux/user/slice';
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
        dispatch(fetchCurrentUser());
        dispatch(fetchBiometriaList()); // Adicionado de volta para carregar do DB no refresh
        dispatch(fetchPlanoList());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser && biometria?.length > 0) {
            const userId = currentUser._id || currentUser.id;
            const userBiometrics = biometria
                .filter(item => item.id_usuario === String(userId))
                .sort((a, b) => (a.id || a._id || '').localeCompare(b.id || b._id || ''));
            const dadosBiometria = userBiometrics.length > 0 ? userBiometrics[userBiometrics.length - 1] : null;
            setMeusDados(dadosBiometria || null);
        } else {
            setMeusDados(null);
        }
    }, [currentUser, biometria]);

    useEffect(() => {
        if (currentUser) {
            setFotoUsuario(currentUser.imagem || null);
        } else {
            setFotoUsuario(null);
        }
    }, [currentUser]);

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
            if (!arquivo.type.startsWith('image/')) {
                showAlert('Por favor, selecione um arquivo de imagem válido.', 'danger');
                return;
            }

            const leitor = new FileReader();
            leitor.readAsDataURL(arquivo);
            leitor.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 300;
                    const MAX_HEIGHT = 300;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const base64Image = canvas.toDataURL('image/jpeg', 0.8);
                    
                    setFotoUsuario(base64Image);

                    if (currentUser) {
                        const userId = currentUser._id || currentUser.id;
                        const { senha, ...userSemSenha } = currentUser;
                        const dadosAtualizados = {
                            ...userSemSenha,
                            imagem: base64Image
                        };

                        dispatch(updateUser({ id: userId, updatedData: dadosAtualizados }))
                            .unwrap()
                            .then(() => {
                                showAlert('Foto de perfil atualizada com sucesso!', 'success');
                            })
                            .catch((err) => {
                                console.error('Erro ao salvar foto de perfil:', err);
                                showAlert('Erro ao salvar foto de perfil no servidor.', 'danger');
                            });
                    }
                };
            };
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

    if (!currentUser) {
        return null;
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
                    <p>Tem certeza de que deseja deletar seu perfil de usuário de forma permanente?</p>
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginBottom: '0' }}>
                        Esta ação não pode ser desfeita. Todos os seus dados de conta, treinos, metabolismo e experiência serão perdidos e você será redirecionado para a tela de login.
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