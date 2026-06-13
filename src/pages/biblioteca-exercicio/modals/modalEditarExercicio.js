import React, { useState, useEffect, useContext } from "react";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import styles from "../biblioteca.module.css";
import { useDispatch} from "react-redux";
import { updateExercicio } from "../../../redux/exercicio/slices";
import { AlertContext } from "../../../context/AlertContext";


export default function EditarExercicioModal({ show, handleClose, exercicio }) {
  const dispatch = useDispatch();
  const { showAlert } = useContext(AlertContext);

  const [nome, setNome] = useState("");
  const [grupo, setGrupo] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [nivel_experiencia, setNivel] = useState("");
  const [dica_tecnica, setDicaTecnica] = useState("");

  // Quando abrir o modal, preencher os campos com os dados atuais
  useEffect(() => {
    if (exercicio) {
      console.log("Carregando dados para edição:", exercicio);
      setNome(exercicio.nome);
      setGrupo(exercicio.grupo);
      setEquipamento(exercicio.equipamento || "Peso Corporal");
      setNivel(exercicio.nivel_experiencia || "Iniciante");
      setDicaTecnica(exercicio.dica_tecnica || "Sem dica técnica disponível.");
    }
  }, [exercicio]);

  const handleSalvar = async () => {
    if (!nome || !grupo || !equipamento || !nivel_experiencia) {
      showAlert("Preencha todos os campos!", 'warning');
      return;
    }

    const exercicioAtualizado = { ...exercicio, nome, grupo, equipamento, nivel_experiencia, dica_tecnica };

    console.log("Disparando edição:", exercicioAtualizado);
    dispatch(updateExercicio(exercicioAtualizado));
    console.log(`Exercício com ID ${exercicio.id} atualizado com sucesso.`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Exercício</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.formGroup}>
          <label>Nome</label>
          <input value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Grupo Muscular</label>
          <select value={grupo} onChange={e => setGrupo(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Peito">Peito</option>
            <option value="Costas">Costas</option>
            <option value="Pernas">Pernas</option>
            <option value="Ombros">Ombros</option>
            <option value="Bíceps">Bíceps</option>
            <option value="Tríceps">Tríceps</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Equipamento</label>
          <select value={equipamento} onChange={e => setEquipamento(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Barra">Barra</option>
            <option value="Halteres">Halteres</option>
            <option value="Peso Corporal">Peso Corporal</option>
            <option value="Polia">Polia</option>
            <option value="Máquina">Máquina</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Nível de Experiência: </label>
          <select value={nivel_experiencia} onChange={e => setNivel(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Dica Técnica: </label>
          <textarea 
            value={dica_tecnica} 
            onChange={e => setDicaTecnica(e.target.value)} 
            rows={3}
            style={{ width: '100%', resize: 'none' }} // Estilo rápido para ajustar a caixa de texto
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <BootstrapButton variant="secondary" onClick={handleClose}>
          Cancelar
        </BootstrapButton>
        <BootstrapButton variant="primary" onClick={handleSalvar}>
          Salvar
        </BootstrapButton>
      </Modal.Footer>
    </Modal>
  );
}