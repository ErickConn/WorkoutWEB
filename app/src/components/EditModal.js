import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

function EditModal({ show, handleClose }) {

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Editar Informações do Plano</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="ABC"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Intermediário"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;