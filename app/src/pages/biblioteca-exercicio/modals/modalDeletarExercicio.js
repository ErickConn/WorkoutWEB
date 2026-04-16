import React from "react";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import styles from "../biblioteca.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setExercicioList } from "../../../redux/exercicio/actions";

export default function DeletarExercicioModal({ show, handleClose, exercicio }) {
  const dispatch = useDispatch();
  const { exercicios } = useSelector(state => state.exercicioReducer);

  const handleConfirmar = async () => {
    try {
      await axios.delete(`https://my-json-server.typicode.com/ErickConn/JSON-Server-WWEB/biblioteca_exercicios/${exercicio.id}`);
      const novaLista = exercicios.filter(ex => ex.id !== exercicio.id);
      dispatch(setExercicioList(novaLista));
      console.log(`Exercício com ID ${exercicio.id} excluído com sucesso.`);
      handleClose();
    } catch (err) {
      console.error("Erro ao excluir exercício:", err);
      alert("Não foi possível excluir o exercício.");
    }
  };

  if (!exercicio) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Remover Exercício</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={styles.warningText}>
          Tem certeza que deseja apagar este exercício? Esta ação não pode ser desfeita.
        </p>
        <div className={styles.exercicioInfo}>
          <p><strong>ID:</strong> {exercicio.id}</p>
          <p><strong>Nome:</strong> {exercicio.nome}</p>
          <p><strong>Grupo:</strong> {exercicio.grupo}</p>
          <p><strong>Equipamento:</strong> {exercicio.equipamento}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <BootstrapButton variant="secondary" onClick={handleClose}>
          Cancelar
        </BootstrapButton>
        <BootstrapButton variant="danger" onClick={handleConfirmar}>
          Confirmar Exclusão
        </BootstrapButton>
      </Modal.Footer>
    </Modal>
  );
}