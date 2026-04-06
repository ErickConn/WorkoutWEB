import React, { useState, useEffect } from 'react';
import styles from './components/home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { createBiometria, fetchBiometriaList, updateBiometria } from '../../redux/Biometria/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalcCard from './components/CalcCard';
import ResultCard from './components/ResultCard';
import LevelCard from './components/LevelCard';


export default function Home({ show, handleClose }) {
    const [id, setId] = useState(0);
    const [idade, setIdade] = useState(0);
    const [altura, setAltura] = useState(0);
    const [peso, setPeso] = useState(0);
    const [nivelAtividade, setNivelAtividade] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!biometria[0].usuario.perfil_biometrico || biometria.length === 0) {
            const biometriaItem = {
            ...biometria[0],
            usuario: {
                ...biometria[0].usuario,
                perfil_biometrico: {
                    idade: idade,
                    altura_cm: altura,
                    peso_kg: peso,
                    nivel_atividade: nivelAtividade
                }
            }
        };
        dispatch(createBiometria(biometriaItem));
            navigate('/');
            handleClose();
            return;
    }else{
        const biometriaItem = {
            ...biometria[0],
            usuario: {
                ...biometria[0].usuario,
                perfil_biometrico: {
                    idade: idade,
                    altura_cm: altura,
                    peso_kg: peso,
                    nivel_atividade: nivelAtividade
                }
            }
        };
        console.log('Dados biométricos a serem enviados:', biometriaItem);
        dispatch(updateBiometria(id, biometriaItem));
        navigate('/');
        handleClose();
    }
    };
    const biometria = useSelector(state => state.biometriaReducer.biometria);
    console.log('Dados biométricos:', biometria);

    useEffect(() => {
        dispatch(fetchBiometriaList());
    }, [dispatch]);
    useEffect(() => {
        if (biometria && biometria.length > 0) {
            setId(biometria[0].id);
            setIdade(biometria[0].usuario.perfil_biometrico.idade);
            setAltura(biometria[0].usuario.perfil_biometrico.altura_cm);
            setPeso(biometria[0].usuario.perfil_biometrico.peso_kg);
            setNivelAtividade(biometria[0].usuario.perfil_biometrico.nivel_atividade);
        }
    }, [biometria]);

    if (!biometria || biometria.length === 0) {
        return (
            <div className={styles.container}>
                <p>Carregando dados biométricos...</p>
            </div>
        );
    }



    const analise = biometria[0]?.usuario.analise_metabolica;

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>

            {/* O closeButton já adiciona automaticamente o "X" para fechar */}
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

            {/* O Body substitui o seu antigo <div className={styles.content}> */}
            <Modal.Body className={styles.modalBodyCustom}>

                <CalcCard
                    peso={biometria[0]?.usuario.perfil_biometrico.peso_kg}
                    altura={biometria[0]?.usuario.perfil_biometrico.altura_cm}
                    idade={biometria[0]?.usuario.perfil_biometrico.idade}
                    nivelAtividade={biometria[0]?.usuario.perfil_biometrico.nivel_atividade}
                    setNivelAtividade={setNivelAtividade}
                    setPeso={setPeso}
                    setAltura={setAltura}
                    setIdade={setIdade}
                />

                <ResultCard
                    tmbCalculada={analise?.tmb_kcal || "1,845"}
                    gastoEnergetico={analise?.gasto_energetico_total_kcal}
                />

                <LevelCard
                    nivelAtual="Intermediário"
                    descricao="Com base no seu perfil, o sistema identificou que você está no nível intermediário..."
                />

            </Modal.Body>

            {/* O Footer é o lugar ideal para o botão de Salvar */}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>

                {/* Você pode manter a sua classe de estilo ou usar o variant="primary" do bootstrap */}
                <Button variant="primary" className={styles.actionBtn} onClick={handleSubmit}>
                    <span>🎯</span> Salvar
                </Button>
            </Modal.Footer>

        </Modal>
    );
}