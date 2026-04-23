import React, { useState, useEffect } from "react";
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { editarPlano } from "../../../redux/planos/slices";
import styles from '../index.module.css';

export default function EditarPlanoModal({ show, handleClose, plano }) {
    const dispatch = useDispatch();
    const [novoTitulo, setNovoTitulo] = useState("");
    const [novaCategoria, setNovaCategoria] = useState("");
    const [novoNivel, setNovoNivel] = useState("");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        if (plano && show) {
            setNovoTitulo(plano.titulo || "");
            setNovaCategoria(plano.categoria || "modelo");
            setNovoNivel(plano.nivel || "Iniciante");
        }
    }, [plano, show]);

    const handleSalvar = async () => {
        if (!novoTitulo.trim()) {
            alert("O nome do plano não pode estar vazio");
            return;
        }

        try {
            setCarregando(true);
            const dados = {
                titulo: novoTitulo,
                categoria: novaCategoria,
                nivel: novoNivel
            };

            await dispatch(editarPlano({idPlano: plano.id, dados: dados}));
            handleClose();
        } catch (err) {
            console.error("Erro ao salvar plano:", err);
            alert("Erro ao salvar o plano");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Plano</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{ marginBottom: '20px' }}>
                    <label className={styles.label}>Nome do Plano</label>
                    <input
                        type="text"
                        className={styles.inputNome}
                        placeholder="Ex: Meu Plano de Treino"
                        value={novoTitulo}
                        onChange={(e) => setNovoTitulo(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className={styles.label}>Categoria</label>
                    <select
                        className={styles.inputNome}
                        style={{ padding: '8px 12px', fontSize: '14px' }}
                        value={novaCategoria}
                        onChange={(e) => setNovaCategoria(e.target.value)}
                    >
                        <option value="favorito">Favorito</option>
                        <option value="modelo">Modelo</option>
                        <option value="personalizado">Personalizado</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label className={styles.label}>Nível</label>
                    <select
                        className={styles.inputNome}
                        style={{ padding: '8px 12px', fontSize: '14px' }}
                        value={novoNivel}
                        onChange={(e) => setNovoNivel(e.target.value)}
                    >
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <BootstrapButton variant="secondary" onClick={handleClose} disabled={carregando}>
                    Cancelar
                </BootstrapButton>
                <BootstrapButton variant="primary" onClick={handleSalvar} disabled={carregando}>
                    {carregando ? "Salvando..." : "Salvar"}
                </BootstrapButton>
            </Modal.Footer>
        </Modal>
    );
}
