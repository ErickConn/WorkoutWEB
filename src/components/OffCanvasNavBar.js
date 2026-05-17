import React from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAuth } from "../redux/user/slice";
import "./OffCanvas.css";

export default function OffCanvasNavBar() {
  const expand = "true";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutAuth());
    navigate('/');
  };

  return (
    <Navbar expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Link to="/treino" className="Link">🏆 Champions's Body</Link>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              🏆 Champions's Body
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="Link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </Nav.Link>
              <NavLink className={({ isActive }) => isActive ? "Link active" : "Link"} to='/perfil'>
                Perfil
              </NavLink>
              <NavLink className={({ isActive }) => isActive ? "Link active" : "Link"} to='/treino'>
                Treino
              </NavLink>
              <NavLink className={({ isActive }) => isActive ? "Link active" : "Link"} to='/progresso'>
                Progresso
              </NavLink>
              <NavDropdown
                title="Bibliotecas"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavLink className="Link Item" to='/biblioteca-treino'>
                  Biblioteca de Treino
                </NavLink>
                <NavDropdown.Divider />
                <NavLink className="Link Item" to='/biblioteca-exercicio'>
                  Biblioteca de Exercício
                </NavLink>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}