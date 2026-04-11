import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBiometria, updateBiometria } from '../../redux/Biometria/actions';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './components/home.module.css';

import CalcCard from './components/CalcCard';
import ResultCard from './components/ResultCard';
import LevelCard from './components/LevelCard';

export default function Home({ show, handleClose }) {
    // 1. Variáveis de Estado
    const [id, setId] = useState(0);
    const [idade, setIdade] = useState(0);
    const [altura, setAltura] = useState(0);
    const [peso, setPeso] = useState(0);
    const [nivelAtividade, setNivelAtividade] = useState(null);
    const [sexo, setSexo] = useState('masculino'); 
    
    // Estado para guardar os dados do usuário atual
    const [usuarioAtual, setUsuarioAtual] = useState(null);

    const dispatch = useDispatch();
    
    
    // 2. Trazendo os dados do Redux (movido para o topo)
    const biometria = useSelector(state => state.biometriaReducer.biometria);

useEffect(() => {
    const emailLogado = localStorage.getItem('usuarioLogadoEmail');
    if (emailLogado && biometria && biometria.length > 0) {
        const usuarioEncontrado = biometria.find(item => item.usuario.email === emailLogado);
        if (usuarioEncontrado) {
            setUsuarioAtual(usuarioEncontrado);
            setId(usuarioEncontrado.id);
            if (usuarioEncontrado.usuario.perfil_biometrico) {
                setIdade(usuarioEncontrado.usuario.perfil_biometrico.idade);
                setAltura(usuarioEncontrado.usuario.perfil_biometrico.altura_cm);
                setPeso(usuarioEncontrado.usuario.perfil_biometrico.peso_kg);
                setNivelAtividade(usuarioEncontrado.usuario.perfil_biometrico.nivel_atividade);
                // Puxa o sexo salvo ou deixa masculino como padrão
                setSexo(usuarioEncontrado.usuario.perfil_biometrico.sexo || 'masculino');
            }
        }
    }
}, [biometria, show]); // O efeito roda sempre que os dados mudam ou o modal abre

    // 4. Função de Salvar
    const handleSubmit = (e) => {
    e.preventDefault();

    if (usuarioAtual) {
        const pesoNum = Number(peso);
        const alturaNum = Number(altura);
        const idadeNum = Number(idade);

        // --- NOVA LÓGICA DE TMB COM SEXO ---
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

        // Montagem do Objeto
        const biometriaAtualizada = {
            ...usuarioAtual,
            usuario: {
                ...usuarioAtual.usuario,
                perfil_biometrico: {
                    idade: idadeNum,
                    altura_cm: alturaNum,
                    peso_kg: pesoNum,
                    nivel_atividade: nivelAtividade,
                    sexo: sexo // Adicionado ao banco!
                },
                analise_metabolica: {
                    tmb_kcal: tmb,
                    gasto_energetico_total_kcal: get
                },
                experiencia_usuario: {
                    nivel_experiencia: "Intermediário"
                }
            }
        };

        dispatch(updateBiometria(usuarioAtual.id, biometriaAtualizada));
        handleClose(); 
    }
};


    // Pega a análise do usuário atual (ou null se não existir)
    const analise = usuarioAtual ? usuarioAtual.usuario.analise_metabolica : null;

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1 className={styles.headerTitle} style={{ fontSize: '1.5rem', marginBottom: 0 }}>
                        Dashboard Biométrico
                    </h1>
                    <p className={styles.headerSubtitle} style={{ fontSize: '1rem', color: '#6c757d', marginBottom: 0 }}>
                        Análise do seu perfil
                    </p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles.modalBodyCustom}>
                <CalcCard
                    peso={peso}
                    altura={altura}
                    idade={idade}
                    sexo={sexo} // Passando a variável
                    nivelAtividade={nivelAtividade}
                    setNivelAtividade={setNivelAtividade}
                    setPeso={setPeso}
                    setAltura={setAltura}
                    setIdade={setIdade}
                    setSexo={setSexo} // Passando a função
                />

                <ResultCard
                    tmbCalculada={analise?.tmb_kcal || "1845"}
                    gastoEnergetico={analise?.gasto_energetico_total_kcal || "2460"}
                />

                <LevelCard
                    nivelAtual={usuarioAtual?.usuario?.experiencia_usuario?.nivel_experiencia || "Intermediário"}
                    descricao="Com base no seu perfil, o sistema identificou que você está neste nível..."
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" className={styles.actionBtn} onClick={handleSubmit}>
                    <span>🎯</span> Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}