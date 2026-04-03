import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Badge, Stack } from "react-bootstrap";

export default function ExerciseCard({ id, nome, series, reps, carga, concluido }) {
  const [isDone, setIsDone] = useState(false);


  return (
    <Card 
      className={`mb-3 border-0 shadow-sm ${isDone ? "bg-light opacity-75" : ""}`}
    >
      <Card.Body className="p-3 position-relative">
        
        <Link 
          to={`/exercicio/${id}`} 
          className="position-absolute top-0 end-0 text-decoration-none p-2 text-secondary"
          style={{ fontSize: '1.1rem', zIndex: 10 }}
        >
          ✎
        </Link>

        <Stack direction="horizontal" gap={3} className="align-items-center">
          <Form.Check 
            type="checkbox"
            id={`check-${id}`}
            checked={isDone}
            onChange={()=>setIsDone(!isDone)}
            className="fs-4 cursor-pointer"
          />

          <div className={isDone ? "text-decoration-line-through text-muted" : ""}>
            <Card.Title as="h6" className="mb-1 fw-bold">
              {nome}
            </Card.Title>
            
            <div className="text-secondary small">
              {series} x {reps} reps 
              <span className="mx-2 text-muted">|</span>
              <Badge bg={isDone ? "secondary" : "primary"} pill>
                {carga} kg
              </Badge>
            </div>
          </div>
        </Stack>
        
      </Card.Body>
    </Card>
  );
}