import React, { useState } from "react";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import styles from "../biblioteca.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setExercicioList } from "../../../redux/exercicio/actions";
import formatarNomeExercicio from "../utils/formatarNome";

export default function NovoExercicioModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const { exercicios } = useSelector(state => state.exercicioReducer);

  const [nome, setNome] = useState("");
  const [grupo, setGrupo] = useState("");
  const [equipamento, setEquipamento] = useState("");

  const handleSalvar = async () => {
    if (!nome || !grupo || !equipamento) {
      alert("Preencha todos os campos!");
      return;
    }

    // pega apenas IDs numéricos válidos
    const idsNumericos = exercicios
      .map(ex => parseInt(ex.id, 10))
      .filter(id => !isNaN(id));

    const ultimoId = idsNumericos.length > 0 ? Math.max(...idsNumericos) : 0;
    console.log("Último ID encontrado:", ultimoId);

    const novoExercicio = {
      id: ultimoId + 1,
      nome: formatarNomeExercicio(nome),
      grupo: formatarNomeExercicio(grupo),
      equipamento: formatarNomeExercicio(equipamento)
    };

    try {
      const res = await axios.post( "https://json-server-wweb.onrender.com/biblioteca_exercicios", novoExercicio );
      dispatch(setExercicioList([...exercicios, res.data]));
      handleClose();
      setNome("");
      setGrupo("");
      setEquipamento("");
      console.log("Novo exercício adicionado:", res.data);
    } catch (err) {
      console.error("Erro ao adicionar exercício:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Novo Exercício</Modal.Title>
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