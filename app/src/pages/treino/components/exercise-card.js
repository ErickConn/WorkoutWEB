import React from "react";
import { Link } from "react-router-dom";
import { Card, Form, Badge, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { atualizarExercicioTreino } from "../../../redux/progresso/slices";

export default function ExerciseCard({ id, nome, series = "-", reps = "-", cargaRealizada, concluido }) {
  const dispatch = useDispatch();

  const handleToggleDone = () => {
    dispatch(atualizarExercicioTreino(id, { concluido: !concluido }));
  };

  return (
    <Card className={`mb-3 border-0 shadow-sm ${concluido ? "bg-light opacity-75" : ""}`}>
      <Card.Body className="p-3 position-relative">
        
        <Link 
          to={`/exercicio/${id}`} 
          className="position-absolute top-0 end-0 text-decoration-none p-2 text-secondary"
          style={{ fontSize: '1.1rem', zIndex: 10 }}
          title="Editar exercício"
        >
          ✎
        </Link>

        {/* Adicionada a classe pe-4 para garantir que o conteúdo não encoste no ícone de editar */}
        <Stack direction="horizontal" gap={3} className="align-items-center pe-4">
          <Form.Check 
            type="checkbox"
            id={`check-${id}`}
            checked={concluido}
            onChange={handleToggleDone}
            className="fs-4 cursor-pointer"
            aria-label={`Marcar ${nome} como concluído`}
          />

          {/* O overflow-hidden aqui ajuda o text-truncate a funcionar corretamente no filho */}
          <div className={`overflow-hidden ${concluido ? "text-decoration-line-through text-muted" : ""}`}>
            <Card.Title as="h6" className="mb-1 fw-bold text-truncate" title={nome}>
              {nome}
            </Card.Title>
            <div className="text-secondary small">
              {series} x {reps} reps 
              <span className="mx-2 text-muted">|</span>
              <Badge bg={concluido ? "secondary" : "primary"} pill>
                {cargaRealizada ? `${cargaRealizada} kg` : "-- kg"}
              </Badge>
            </div>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}