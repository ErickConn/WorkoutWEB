import React, { useState, useEffect, useMemo } from 'react'; // Adicionado useMemo
import { useDispatch, useSelector } from 'react-redux';
import { updateBiometria } from '../../redux/Biometria/slice';
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
    const biometria = useSelector(state => state.biometriaReducer.biometria);

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
        const emailLogado = localStorage.getItem('usuarioLogadoEmail');
        if (emailLogado && biometria?.length > 0) {
            const usuarioEncontrado = biometria.find(item => item.usuario.email === emailLogado);
            if (usuarioEncontrado) {
                setUsuarioAtual(usuarioEncontrado);
                setId(usuarioEncontrado.id);
                if (usuarioEncontrado.usuario.perfil_biometrico) {
                    setIdade(usuarioEncontrado.usuario.perfil_biometrico.idade);
                    setAltura(usuarioEncontrado.usuario.perfil_biometrico.altura_cm);
                    setPeso(usuarioEncontrado.usuario.perfil_biometrico.peso_kg);
                    setNivelAtividade(usuarioEncontrado.usuario.perfil_biometrico.nivel_atividade);
                    setSexo(usuarioEncontrado.usuario.perfil_biometrico.sexo || 'masculino');
                    setNivelExperiencia(usuarioEncontrado.usuario.experiencia_usuario.nivel_experiencia || 'iniciante');
                }
            }
        }
    }, [biometria, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuarioAtual) {
            const biometriaAtualizada = {
                ...usuarioAtual,
                usuario: {
                    ...usuarioAtual.usuario,
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
                        nivel_experiencia: nivelExperiencia
                    }
                }
            };
            dispatch(updateBiometria({ id: usuarioAtual.id, updatedData: biometriaAtualizada }));
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
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" className={styles.actionBtn} onClick={handleSubmit}>
                    <span>🎯</span> Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}