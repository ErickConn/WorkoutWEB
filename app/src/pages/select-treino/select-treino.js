import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./components/select-treino.module.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreinoList, setTreinoAtivo } from '../../redux/treino/actions';
import RoutineCard from './components/routinecard';
import LastWorkout from './components/lastworkout.js';
import HighlightWorkoutCard from './components/HighlightWorkoutCard.js';

export default function Selecttreino() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const planos = useSelector(state => state.treinoReducer.planos) || [];
    const treino = planos.find(p => p.ativo) || planos[0];

    useEffect(() => {
        dispatch(fetchTreinoList());
    }, [dispatch]);

    if (!treino || !treino.rotina) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <p>Carregando treinos...</p>
            </Container>
        );
    }

    const handleSelecionarTreino = async (dia) => {
        console.log("Dia clicado:", dia);
        if (!dia) {
            console.error("O clique falhou porque o dia está vazio!");
            return;
        }
        await dispatch(setTreinoAtivo(dia));
        navigate('/treino');
    };

    const colors = [styles['bg-blue-light'], styles['bg-purple-light'], styles['bg-green-light']];

    return (
        <Container className="py-4" style={{ maxWidth: '1200px' }}>
            <main>
                <div className={`${styles['banner-blue']} mb-4`}>
                    <h2>Escolha Seu Treino</h2>
                    <p className="mb-0">Plano: {treino.titulo}</p>
                </div>

                {treino.rotina.length > 0 && (
                    <div className="mb-3">
                        <LastWorkout
                            dia={treino.rotina[0].dia}
                            foco={treino.rotina[0].foco}
                            lastDone={2}
                        />
                    </div>
                )}

                <div className="mb-4">
                    <HighlightWorkoutCard
                        variant="green"
                        badgeText="✨ RECOMENDADO HOJE"
                        title={`Treino ${treino.rotina[0]?.dia || ''}`}
                        subtitle={treino.rotina[0]?.foco}
                        footerText={<span>{treino.rotina[0]?.exercicios?.length || 0} exercícios</span>}
                        onClick={() => handleSelecionarTreino(treino.rotina[0]?.dia)}
                    />
                </div>

                <h3 className={`${styles.sectionTitle} mb-3`}>Sua Rotina</h3>

                <Row className="g-3 mb-4">
                    {treino.rotina.map((item, index) => (
                        <Col xs={12} md={6} lg={4} key={item.dia || index}>
                            <RoutineCard
                                onClick={() => handleSelecionarTreino(item.dia)}
                                letter={String.fromCharCode(65 + index)}
                                colorClass={colors[index % colors.length]}
                                dia={item.dia}
                                foco={item.foco}
                                lastDone="-- dias atrás"
                                exercises={item.exercicios?.length || 0}
                                time={item.estimativaTempo || 45}
                            />
                        </Col>
                    ))}
                </Row>

                <div className={`${styles.divider} my-4`}>
                    <span>OU</span>
                </div>

                <HighlightWorkoutCard
                    variant="purple"
                    badgeText="✨ PERSONALIZE"
                    title="Treino Livre"
                    subtitle="Monte sua própria sessão"
                    footerText="Escolha os exercícios que você quer fazer hoje"
                    linkTo="/plano"
                />
            </main>
        </Container>
    );
}