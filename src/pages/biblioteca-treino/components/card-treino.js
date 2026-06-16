import React, { useState, useEffect, useContext } from 'react';
import styles from '../index.module.css';
import { useNavigate } from 'react-router-dom';
import { removerPlano, setPlanoAtivo } from '../../../redux/planos/slices';
import { removerTreinoDaAPI } from '../../../redux/treinos/slices';
import { removerTreinoDaRotina } from '../../../redux/treinos/slices';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import EditarPlanoModal from './EditarPlanoModal';
import TreinoLivreModal from '../../treino-livre';
import { AlertContext } from '../../../context/AlertContext';
import { getLoggedUser } from '../../../utils/userAuth';
import ConfirmModal from '../../../components/ConfirmModal';
import { getErrorMessage } from '../../../utils/helpers';

export default function CardTreino({
  id,
  titulo,
  nivel = "Iniciante",
  categoria = "modelo",
  rotina = [],
  userId = null,
  mostrarCriador = false
}) {
  // userId pode ser um ObjectId (string) ou um objeto populado { _id, id, nome, imagem }
  const criadorObj = userId && typeof userId === 'object' ? userId : null;
  const dispatch = useDispatch();
  const [aberto, setAberto] = useState(false);
  const [diasExpandidos, setDiasExpandidos] = useState({});

  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  // Estados para os Modais
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTreinoModal, setShowTreinoModal] = useState(false);
  const [treinoEmEdicao, setTreinoEmEdicao] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Estados para os modais de confirmação
  const [confirmPlano, setConfirmPlano] = useState(false);           // remover plano completo
  const [confirmTreino, setConfirmTreino] = useState(null);          // { treinoId, dia } para remover treino único
  const [confirmDeletePlano, setConfirmDeletePlano] = useState(null); // { idPlano, dia } quando é o último treino

  // Nome e foto do criador vêm do userId já populado pelo backend
  const nomeCriador = criadorObj?.nome || null;
  const fotoCriador = criadorObj?.imagem || null;

  useEffect(() => {
    const carregarDados = async () => {
      const usuario = await getLoggedUser();
      setUsuarioLogado(usuario);
    };
    carregarDados();
  }, []);

  // Extrai o ID do criador para comparação (userId pode ser objeto populado ou string)
  const criadorId = criadorObj ? (criadorObj.id || criadorObj._id) : userId;

  const podeModificar = Boolean(
    usuarioLogado &&
    (usuarioLogado.usuario.role === 'admin' || String(usuarioLogado.usuario.id) === String(criadorId))
  );

  // Handlers para EditModal
  const handleOpenEdit = (e) => { e.stopPropagation(); setShowEditModal(true); };
  const handleCloseEdit = () => setShowEditModal(false);

  // Handlers para TreinoLivreModal
  const handleOpenTreino = (e, treino = null) => {
    e.stopPropagation();
    setTreinoEmEdicao(treino);
    setShowTreinoModal(true);
  };
  const handleCloseTreino = () => {
    setShowTreinoModal(false);
    setTreinoEmEdicao(null);
  };

  const toggleVerMais = (e, dia) => {
    e.stopPropagation();
    setDiasExpandidos(prev => ({ ...prev, [dia]: !prev[dia] }));
  };

  const handleRemoverPlanoCompleto = (e) => {
    e.stopPropagation();
    setConfirmPlano(true);
  };

  const handleConfirmRemoverPlano = () => {
    setConfirmPlano(false);
    dispatch(removerPlano(id));
  };

  const handleRemoverTreinoUnico = (e, treinoId, dia) => {
    e.stopPropagation();
    if (treinoId === 'temp-preview') {
      dispatch(removerTreinoDaRotina({ dia }));
    } else {
      setConfirmTreino({ treinoId, dia });
    }
  };

  const handleConfirmRemoverTreino = () => {
    const { treinoId, dia } = confirmTreino;
    setConfirmTreino(null);
    dispatch(removerTreinoDaAPI({ idPlano: treinoId, diaParaRemover: dia, rotinaAtual: rotina }))
      .unwrap()
      .then((result) => {
        // Thunk retorna este sinal quando o treino era o último do plano
        if (result?.action === 'confirm_delete_plan') {
          setConfirmDeletePlano({ idPlano: result.idPlano, dia: result.diaParaRemover });
        }
      })
      .catch((err) => {
        showAlert(getErrorMessage(err, 'Erro ao remover treino.'), 'error');
      });
  };

  const handleConfirmDeletePlanoFinal = () => {
    const { idPlano, dia } = confirmDeletePlano;
    setConfirmDeletePlano(null);
    dispatch(removerTreinoDaAPI({ idPlano, diaParaRemover: dia, rotinaAtual: rotina, confirmarDelecao: true }))
      .unwrap()
      .catch((err) => showAlert(getErrorMessage(err, 'Erro ao remover plano.'), 'error'));
  };

  const handleComecarTreino = async (e) => {
    e.preventDefault();
    await dispatch(setPlanoAtivo(id));
    navigate('/treino');
  };

  return (
    <div
      className={`${styles.cardTreino} ${aberto ? styles.cardAberto : ''}`}
      onClick={() => setAberto(!aberto)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <EditarPlanoModal
          show={showEditModal}
          handleClose={handleCloseEdit}
          plano={{ id, titulo, categoria, nivel }}
        />
        <TreinoLivreModal
          show={showTreinoModal}
          handleClose={handleCloseTreino}
          rotina={rotina}
          idPlano={id === 'temp-preview' ? null : id}
          treinoEmEdicao={treinoEmEdicao}
        />

        {/* Modal: confirmar remoção do plano completo */}
        <ConfirmModal
          show={confirmPlano}
          title="Remover plano?"
          message={`"${titulo}" será excluído permanentemente. Esta ação não pode ser desfeita.`}
          confirmLabel="Remover"
          cancelLabel="Cancelar"
          variant="danger"
          icon="🗑️"
          onConfirm={handleConfirmRemoverPlano}
          onCancel={() => setConfirmPlano(false)}
        />

        {/* Modal: confirmar remoção de um treino único */}
        <ConfirmModal
          show={Boolean(confirmTreino)}
          title={`Remover treino ${confirmTreino?.dia}?`}
          message="Este dia de treino será removido do plano."
          confirmLabel="Remover treino"
          cancelLabel="Cancelar"
          variant="danger"
          icon="⚠️"
          onConfirm={handleConfirmRemoverTreino}
          onCancel={() => setConfirmTreino(null)}
        />

        {/* Modal: último treino — pergunta se quer deletar o plano inteiro */}
        <ConfirmModal
          show={Boolean(confirmDeletePlano)}
          title="Último treino do plano"
          message="Este é o único treino restante. Deseja excluir o plano inteiro?"
          confirmLabel="Excluir plano"
          cancelLabel="Manter plano"
          variant="danger"
          icon="🚨"
          onConfirm={handleConfirmDeletePlanoFinal}
          onCancel={() => setConfirmDeletePlano(null)}
        />
      </div>

      <div className={styles.cardMainInfo}>
        <div className={`${styles.badgeIcon} ${styles.bgGreen}`}>💪</div>

        <div className={styles.cardTextContent}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardName}>{titulo || "Novo Plano"}</h3>
          </div>
          <p className={styles.cardDetails}>{rotina.length} treinos • {nivel}</p>
          {(categoria === 'modelo' || mostrarCriador) && nomeCriador && (
            <div className={styles.cardCriador}>
              {fotoCriador ? (
                <img
                  src={fotoCriador}
                  alt={nomeCriador}
                  className={styles.avatarCriador}
                />
              ) : (
                <div className={styles.avatarCriadorFallback}>
                  {nomeCriador.charAt(0).toUpperCase()}
                </div>
              )}
              <span>Criado por <strong>{nomeCriador}</strong></span>
            </div>
          )}

          {id !== 'temp-preview' && podeModificar && (
            <div className={styles.cardActions}>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleOpenEdit}
                className="me-2"
              >
                Editar Plano
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleRemoverPlanoCompleto}
              >
                🗑️ Remover
              </Button>
            </div>
          )}
        </div>
        <div className={`${styles.seta} ${aberto ? styles.setaAtiva : ''}`}>›</div>
      </div>

      {aberto && rotina.length > 0 && (
        <div className={styles.containerExpansivel} onClick={(e) => e.stopPropagation()}>
          {rotina.map((item, idx) => {
            const isExpandido = diasExpandidos[item.dia];
            const exerciciosVisiveis = isExpandido ? item.exercicios : item.exercicios.slice(0, 3);

            return (
              <div key={idx} className={styles.itemRotina}>
                <div className={styles.headerRotina}>
                  <div className={`${styles.miniBadge} ${styles.bgGreen}`}>{item.dia}</div>
                  <div className={styles.infoRotina}>
                    <p className={styles.focoRotina}>Treino {item.dia} - {item.foco}</p>
                  </div>

                  {(podeModificar || id === 'temp-preview') && (
                    <div className={styles.itemActions}>
                      <Button
                        size="sm"
                        variant="light"
                        className={styles.btnEditar}
                        onClick={(e) => handleOpenTreino(e, item)}
                      >
                        ✏️
                      </Button>
                      <button
                        className={styles.btnX}
                        onClick={(e) => handleRemoverTreinoUnico(e, id, item.dia)}
                        title="Remover este dia"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.listaExerciciosPreview}>
                  {exerciciosVisiveis.map((ex, idx) => (
                    <div key={ex._id || `${ex.id}-${idx}`} className={styles.linhaExercicio}>
                      <span className={styles.bullet}>•</span>
                      <span className={styles.nomeEx}>{ex.nome}</span>
                      <span className={styles.metaEx}>{ex.seriesPadrao}x{ex.repsPadrao}</span>
                    </div>
                  ))}

                  {item.exercicios.length > 3 && (
                    <button className={styles.verMaisBtn} onClick={(e) => toggleVerMais(e, item.dia)}>
                      {isExpandido ? "Ver menos" : `+ ${item.exercicios.length - 3} movimentos`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {id !== 'temp-preview' ? (
            <>
              {podeModificar && (
                <Button
                  variant="outline-primary"
                  className={styles.btnAdicionarTreino}
                  onClick={(e) => { e.stopPropagation(); handleOpenTreino(e); }}
                >
                  + Adicionar Novo Treino
                </Button>
              )}
              <button className={styles.btnIniciar} onClick={handleComecarTreino}>Começar Treino</button>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}