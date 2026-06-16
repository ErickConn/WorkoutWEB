import styles from './index.module.css';
import HeaderBack from "../../components/HeaderBack";
import FooterButton from "../../components/FooterButton";
import SearchBar from "../../components/SearchBar";
import Filtro from "../../components/Filtro";
import ListaTreinos from "./components/lista-treinos";
import { fetchPlanoList } from '../../redux/planos/slices';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedUser } from '../../utils/userAuth';

import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";

export default function BibliotecaTreino() {
  const [busca, setBusca] = useState("");
  const [nivelAtivo, setNivelAtivo] = useState("Todos");
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const dispatch = useDispatch();
  const todosOsTreinos = useSelector(rootReducer => rootReducer.planosReducer.planos);
  const loading = useSelector(rootReducer => rootReducer.planosReducer.loading);

  useEffect(() => {
    dispatch(fetchPlanoList());
    getLoggedUser().then(setUsuarioLogado);
  }, [dispatch])

  const isAdmin = usuarioLogado?.usuario?.role === 'admin';

  if (loading) {
    return <Spinner className="vh-100" />;
  }

  const treinosFiltrados = todosOsTreinos.filter((treino) => {
    const bateBusca = treino.titulo.toLowerCase().includes(busca.toLowerCase());
    const bateNivel = nivelAtivo === "Todos" || treino.nivel === nivelAtivo;
    return bateBusca && bateNivel;
  });

  const favoritos = treinosFiltrados.filter(t => t.categoria === "favorito");
  const modelos = treinosFiltrados.filter(t => t.categoria === "modelo");
  const personalizados = treinosFiltrados.filter(t => t.categoria === "personalizado");

  // Para admins: separa os próprios planos personalizados dos planos de alunos
  const adminId = usuarioLogado?.usuario?.id || usuarioLogado?.usuario?._id;
  const personalizadosAdmin = isAdmin
    ? personalizados.filter(t => {
        const criadorId = t.userId?._id || t.userId?.id || t.userId;
        return String(criadorId) === String(adminId);
      })
    : [];
  const personalizadosAlunos = isAdmin
    ? personalizados.filter(t => {
        const criadorId = t.userId?._id || t.userId?.id || t.userId;
        return String(criadorId) !== String(adminId);
      })
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <HeaderBack title="Biblioteca de Treinos" subtitle="Planos modelo"></HeaderBack>

        <SearchBar
          placeholder="Buscar treinos..."
          value={busca}
          onChange={setBusca}
        />

        <Filtro
          tipo="NÍVEL"
          filtros={["Todos", "Iniciante", "Intermediário", "Avançado"]}
          ativo={nivelAtivo}
          onSelect={setNivelAtivo}
        />

        <ListaTreinos titulo="✨ FAVORITOS" dados={favoritos} />
        <ListaTreinos titulo="Todos os Planos Modelo" dados={modelos} />
        {isAdmin ? (
          <>
            <ListaTreinos titulo="🏋️ Seus Planos Personalizados" dados={personalizadosAdmin} />
            <ListaTreinos titulo="👥 Planos de Alunos" dados={personalizadosAlunos} mostrarCriador />
          </>
        ) : (
          <ListaTreinos titulo="Seus Treinos" dados={personalizados} />
        )}

        {treinosFiltrados.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhum treino de nível <strong>{nivelAtivo}</strong> encontrado para <strong>"{busca}"</strong>.</p>
          </div>
        )}
        <FooterButton title="Criar Novo Plano" link="/plano"></FooterButton>
      </div>
    </div>
  );
}