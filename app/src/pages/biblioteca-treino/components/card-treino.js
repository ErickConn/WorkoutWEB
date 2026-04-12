import React, { useState } from 'react';
import styles from '../index.module.css';
import { useNavigate } from 'react-router-dom';
import { removerPlano, removerTreinoDaRotinaEdicao, removerTreinoDaAPI, setPlanoAtivo } from '../../../redux/treino/actions';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import EditarPlanoModal from './EditarPlanoModal';
import TreinoLivreModal from '../../treino-livre';

export default function CardTreino({
  id,
  titulo,
  isPreview = false,
  nivel = "Iniciante",
  categoria = "modelo",
  rotina = []
}) {
  const dispatch = useDispatch();
  const [aberto, setAberto] = useState(false);
  const [diasExpandidos, setDiasExpandidos] = useState({});

  const navigate = useNavigate();

  // Estados para os Modais
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTreinoModal, setShowTreinoModal] = useState(false);
  const [treinoEmEdicao, setTreinoEmEdicao] = useState(null);

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
    if (window.confirm(`Deseja remover permanentemente o plano "${titulo}"?`)) {
      dispatch(removerPlano(id));
    }
  };

  const handleRemoverTreinoUnico = (e, treinoId, dia) => {
    e.stopPropagation();
    if (window.confirm(`Remover treino de ${dia}?`)) {
      if (isPreview) {
        dispatch(removerTreinoDaRotinaEdicao(dia));
      } else {
        dispatch(removerTreinoDaAPI(treinoId, dia, rotina));
      }
    }
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
          idPlano={isPreview ? null : id}
          treinoEmEdicao={treinoEmEdicao}
        />
      </div>

      <div className={styles.cardMainInfo}>
        <div className={`${styles.badgeIcon} ${styles.bgGreen}`}>💪</div>

        <div className={styles.cardTextContent}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardName}>{titulo || "Novo Plano"}</h3>
          </div>
          <p className={styles.cardDetails}>{rotina.length} treinos • {nivel}</p>

          {!isPreview && (
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
                </div>

                <div className={styles.listaExerciciosPreview}>
                  {exerciciosVisiveis.map((ex) => (
                    <div key={ex.id} className={styles.linhaExercicio}>
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

          {!isPreview && (
            <>
              <Button
                variant="outline-primary"
                className={styles.btnAdicionarTreino}
                onClick={(e) => { e.stopPropagation(); handleOpenTreino(e); }}
              >
                + Adicionar Novo Treino
              </Button>
              <button className={styles.btnIniciar} onClick={handleComecarTreino}>Começar Treino</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}