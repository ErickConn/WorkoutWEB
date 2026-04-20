import React, { useState, useEffect } from "react";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import styles from "../biblioteca.module.css";
import { useDispatch} from "react-redux";
import { updateExercicio } from "../../../redux/exercicio/slices";


export default function EditarExercicioModal({ show, handleClose, exercicio }) {
  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [grupo, setGrupo] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [nivel_experiencia, setNivel] = useState("");

  // Quando abrir o modal, preencher os campos com os dados atuais
  useEffect(() => {
    if (exercicio) {
      console.log("Carregando dados para edição:", exercicio);
      setNome(exercicio.nome);
      setGrupo(exercicio.grupo);
      setEquipamento(exercicio.equipamento);
      setNivel(exercicio.nivel_experiencia || "Iniciante");
    }
  }, [exercicio]);

  const handleSalvar = async () => {
    if (!nome || !grupo || !equipamento) {
      alert("Preencha todos os campos!");
      return;
    }

    const exercicioAtualizado = { ...exercicio, nome, grupo, equipamento, nivel_experiencia };

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
          <input value={grupo} onChange={e => setGrupo(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Equipamento</label>
          <input value={equipamento} onChange={e => setEquipamento(e.target.value)} />
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