import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./biblioteca.module.css";
import HeaderBack from "../../components/HeaderBack";
import { fetchExercicioList } from '../../redux/exercicio/actions';
import TreinoLivre from "../treino-livre";

export default function BibliotecaExercicios() {
    const dispatch = useDispatch();
    const { exercicios, loading, error } = useSelector(state => state.exercicioReducer);

    const [busca, setBusca] = useState("");
    const [grupoAtivo, setGrupoAtivo] = useState("Todos");

    const [editandoId, setEditandoId] = useState(null);
    const [exercicioEditado, setExercicioEditado] = useState({
        nome: "",
        grupoMuscular: "",
        dicaTecnica: ""
    });

    useEffect(() => {
        dispatch(fetchExercicioList());
    }, [dispatch]);

    if (loading) return <p>Carregando página, aguarde...</p>;
    if (error) return <p>Erro: {error}</p>;


    const gruposMusculares = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

    // Excluir exercício (simulação local)
    const excluirExercicio = (id) => {
        const novaLista = exercicios.filter(ex => ex.id !== id);
        // aqui você pode usar setExercicioList(novaLista) se quiser atualizar via Redux
    };

    // Iniciar edição
    const iniciarEdicao = (ex) => {
        setEditandoId(ex.id);
        setExercicioEditado({ ...ex });
    };

    // Salvar edição (simulação local)
    const salvarEdicao = () => {
        const novaLista = exercicios.map(ex =>
        ex.id === editandoId ? { ...exercicioEditado } : ex
        );
        // aqui você pode usar setExercicioList(novaLista) se quiser atualizar via Redux
        setEditandoId(null);
        setExercicioEditado({ nome: "", grupoMuscular: "", dicaTecnica: "" });
    };
    // Filtragem
    const exerciciosFiltrados = exercicios.filter(ex => {
        const bateBusca = ex.nome.toLowerCase().includes(busca.toLowerCase());
        const bateGrupo = grupoAtivo === "Todos" || ex.grupoMuscular === grupoAtivo;
        return bateBusca && bateGrupo;
    });


    
    return (
        <div className={styles.biblioteca}>
            <HeaderBack
                title="Biblioteca de Exercícios"
                subtitle="Várias opções para escolher"
                link="../treino-livre"
            />
            {/* Barra de busca */}
            <input
                className={styles.search}
                placeholder="Buscar exercício..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
            />

            {/* Filtro por grupo muscular */}
            <div className={styles.filtro}>
                {gruposMusculares.map(grupo => (
                <button
                    key={grupo}
                    className={grupoAtivo === grupo ? styles.active : ""}
                    onClick={() => setGrupoAtivo(grupo)}
                >
                    {grupo}
                </button>
                ))}
            </div>

            {/* Lista de exercícios */}
            <ul className={styles.lista}>
                {exerciciosFiltrados.map(ex => (
                <li key={ex.id} className={styles.item}>
                    {editandoId === ex.id ? (
                    <>
                        <input
                        value={exercicioEditado.nome}
                        onChange={e => setExercicioEditado({ ...exercicioEditado, nome: e.target.value })}
                        />
                        <input
                        value={exercicioEditado.grupoMuscular}
                        onChange={e => setExercicioEditado({ ...exercicioEditado, grupoMuscular: e.target.value })}
                        />
                        <input
                        value={exercicioEditado.dicaTecnica}
                        onChange={e => setExercicioEditado({ ...exercicioEditado, dicaTecnica: e.target.value })}
                        />
                        <button onClick={salvarEdicao}>Salvar</button>
                        <button onClick={() => setEditandoId(null)}>Cancelar</button>
                    </>
                    ) : (
                    <>
                        <strong>{ex.nome}</strong> – {ex.grupoMuscular}
                        <p className={styles.dica}>{ex.dicaTecnica}</p>
                        <button onClick={() => iniciarEdicao(ex)}>Editar</button>
                        <button onClick={() => excluirExercicio(ex.id)}>Excluir</button>
                    </>
                    )}
                </li>
                ))}
            </ul>

            {/* Empty state */}
            {exerciciosFiltrados.length === 0 && (
                <div className={styles.emptyState}>
                <p>
                    Nenhum exercício encontrado para <strong>{grupoAtivo}</strong> com busca <strong>"{busca}"</strong>.
                </p>
                </div>
            )}
        </div>
        
    );
}
