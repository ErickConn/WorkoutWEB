import React, { useState, useEffect, useMemo } from 'react'; // Adicionado useMemo
import { useDispatch, useSelector } from 'react-redux';
import { updateBiometria, createBiometria } from '../../redux/Biometria/slice';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './components/home.module.css';

import CalcCard from './components/CalcCard';
import ResultCard from './components/ResultCard';
import LevelCard from './components/LevelCard';

export default function Home({ show, handleClose }) {
    const [id, setId] = useState(0);
    const [idade, setIdade] = useState(0);
    const [altura, setAltura] = useState(0);
    const [peso, setPeso] = useState(0);
    const [nivelAtividade, setNivelAtividade] = useState('sedentario');
    const [sexo, setSexo] = useState('masculino'); 
    const [nivelExperiencia, setNivelExperiencia] = useState('iniciante');
    const [usuarioAtual, setUsuarioAtual] = useState(null);

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const biometriaList = useSelector(state => state.biometriaReducer.biometria);
    const loading = useSelector(state => state.biometriaReducer.loading || state.userReducer.loading);

    // Encontra a biometria do usuário atual (a mais recente)
    const biometriaAtual = useMemo(() => {
        if (!currentUser) return null;
        const currentId = currentUser._id || currentUser.id;
        const userBiometrics = biometriaList
            .filter(item => item.id_usuario === String(currentId))
            .sort((a, b) => (a.id || a._id || '').localeCompare(b.id || b._id || ''));
        return userBiometrics.length > 0 ? userBiometrics[userBiometrics.length - 1] : null;
    }, [currentUser, biometriaList]);

    // --- LÓGICA DE CÁLCULO AO VIVO (LIVE PREVIEW) ---
    // Usamos useMemo para que o cálculo só ocorra quando um valor mudar
    const calculosAoVivo = useMemo(() => {
        const pesoNum = Number(peso) || 0;
        const alturaNum = Number(altura) || 0;
        const idadeNum = Number(idade) || 0;

        if (pesoNum === 0 || alturaNum === 0 || idadeNum === 0) return { tmb: 0, get: 0 };

        const baseTmb = (10 * pesoNum) + (6.25 * alturaNum) - (5 * idadeNum);
        const tmb = Math.round(sexo === 'masculino' ? baseTmb + 5 : baseTmb - 161);

        const multiplicadores = {
            sedentario: 1.2,
            leve: 1.375,
            moderado: 1.55,
            intenso: 1.725,
            muito_intenso: 1.9
        };
        const fator = multiplicadores[nivelAtividade] || 1.2;
        const get = Math.round(tmb * fator);

        return { tmb, get };
    }, [peso, altura, idade, sexo, nivelAtividade]);

    useEffect(() => {
        if (currentUser) {
            setUsuarioAtual(currentUser);
            setId(currentUser._id || currentUser.id);
            if (biometriaAtual && biometriaAtual.perfil_biometrico) {
                setIdade(biometriaAtual.perfil_biometrico.idade || 0);
                setAltura(biometriaAtual.perfil_biometrico.altura_cm || 0);
                setPeso(biometriaAtual.perfil_biometrico.peso_kg || 0);
                setNivelAtividade(biometriaAtual.perfil_biometrico.nivel_atividade || 'sedentario');
                setSexo(biometriaAtual.perfil_biometrico.sexo || 'masculino');
                setNivelExperiencia(biometriaAtual.experiencia_usuario?.nivel_experiencia || 'iniciante');
            }
        }
    }, [currentUser, biometriaAtual, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuarioAtual) {
            const currentId = usuarioAtual._id || usuarioAtual.id;
            
            const payload = {
                id_usuario: String(currentId),
                perfil_biometrico: {
                    idade: Number(idade),
                    altura_cm: Number(altura),
                    peso_kg: Number(peso),
                    nivel_atividade: nivelAtividade,
                    sexo: sexo
                },
                analise_metabolica: {
                    tmb_kcal: calculosAoVivo.tmb,
                    gasto_energetico_total_kcal: calculosAoVivo.get
                },
                experiencia_usuario: {
                    nivel_experiencia: nivelExperiencia,
                    objetivos: biometriaAtual?.experiencia_usuario?.objetivos || []
                }
            };

            if (biometriaAtual && biometriaAtual._id) {
                dispatch(updateBiometria({ id: biometriaAtual._id, updatedData: payload }));
            } else {
                dispatch(createBiometria(payload));
            }
            
            handleClose(); 
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1 className={styles.headerTitle} style={{ fontSize: '1.5rem', marginBottom: 0 }}>
                        Dashboard Biométrico
                    </h1>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBodyCustom}>
                <CalcCard
                    peso={peso}
                    altura={altura}
                    idade={idade}
                    sexo={sexo} 
                    nivelAtividade={nivelAtividade}
                    nivelExperiencia={nivelExperiencia}
                    setNivelAtividade={setNivelAtividade}
                    setPeso={setPeso}
                    setAltura={setAltura}
                    setIdade={setIdade}
                    setSexo={setSexo} 
                    setNivelExperiencia={setNivelExperiencia}
                />

                <ResultCard
                    tmbCalculada={calculosAoVivo.tmb} // Agora mostra o cálculo em tempo real
                    gastoEnergetico={calculosAoVivo.get} // Agora mostra o cálculo em tempo real
                />

                <LevelCard
                    nivelAtual={nivelExperiencia} // Passamos o state local para mudar o card na hora!
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>Cancelar</Button>
                <Button variant="primary" className={styles.actionBtn} onClick={handleSubmit} disabled={loading}>
                    <span>🎯</span> {loading ? 'Salvando...' : 'Salvar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}