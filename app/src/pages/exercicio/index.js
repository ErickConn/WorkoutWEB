import React from "react";
import styles from './exercicio.module.css';
import { Link, useParams } from "react-router-dom";
import HeaderBack from "../../components/HeaderBack";

// Importando os novos componentes
import RegistroCard from "./components/registro-card";
import SeriesCard from "./components/series-card";
import SubstitutosCard from "./components/substitutos-card";

export default function Exercicio() {
  const { id } = useParams();

  const exercicios = [
    {
      "id": 0,
      "nome": "Supino Reto",
      "numSeries": 3,
      "numReps": "8-12",
      "carga": "30kg",
      "dica": "Mantenha os pés firmes no chão e escápulas contraídas no banco.",
      "historico": [{ "serie": 1, "valor": "12 reps × 30kg" }],
      "substitutos": [{ "nome": "Supino com Halteres", "equipamento": "Halteres" }]
    },
  ];

  const exercicioAtual = exercicios.find(ex => ex.id === Number(id)) || exercicios[0];

  return (
    <div className={styles.container}>
      <HeaderBack 
        title={exercicioAtual.nome} 
        subtitle={`${exercicioAtual.numSeries} x ${exercicioAtual.numReps} reps`} 
      />

      <div className={styles.content}>
        <div className={styles.mainGrid}>
          
          <div className={styles.column}>
            <SeriesCard 
                historico={exercicioAtual.historico} 
                dica={exercicioAtual.dica} 
            />
          </div>

          <div className={styles.column}>
            <RegistroCard 
                numSeries={exercicioAtual.numSeries} 
                carga={exercicioAtual.carga} 
            />
            
            <SubstitutosCard 
                substitutos={exercicioAtual.substitutos} 
            />
          </div>

        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <Link to='/treino' className={styles.btnComplete}>Concluir</Link>
          <button className={styles.btnReplace}>Trocar Exercício</button>
        </div>
      </div>
    </div>
  );
}