import React, { useState, useEffect } from 'react';
import styles from './components/home.module.css';
import { Link } from 'react-router-dom';
import { fetchBiometriaList } from '../../redux/Biometria/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalcCard from './components/CalcCard';
import ResultCard from './components/ResultCard';
import LevelCard from './components/LevelCard';

// 1. Adicionado as chaves {} e removido a biometria das props
export default function Home({ show, handleClose }) {
  
  const dispatch = useDispatch();
  
  // 2. A biometria é puxada exclusivamente daqui
  const biometria = useSelector(state => state.biometriaReducer.biometria);
  console.log('Dados biométricos:', biometria);
  
  useEffect(() => {
      dispatch(fetchBiometriaList());
  }, [dispatch]);
    
  if (!biometria || biometria.length === 0) {
    return (
      <div className={styles.container}>
        <p>Carregando dados biométricos...</p>
      </div>
    );
  }
  
  const usuario = biometria[0]?.usuario;
  const perfil = usuario?.perfil_biometrico;
  const analise = usuario?.analise_metabolica;
  
  // 3. Comentário movido para fora do JSX
  // size="lg" deixa o modal grande (largo) e centered centraliza na tela
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
                    peso={perfil?.peso_kg} 
                    altura={perfil?.altura_cm} 
                    idade={perfil?.idade} 
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
                <Button variant="primary" className={styles.actionBtn} onClick={handleClose}>
                    <span>🎯</span> Salvar
                </Button>
            </Modal.Footer>
            
        </Modal>
  );
}