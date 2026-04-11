import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, Link } from "react-router-dom";
import "./OffCanvas.css";

export default function OffCanvasNavBar(){
    const expand = "true";
       return(
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
                  <NavLink className={({ isActive }) => isActive ? "Link active" : "Link"} to='/login'>
                    Logout
                  </NavLink>
                  <NavLink className={({ isActive }) => isActive ? "Link active" : "Link"} to='/'>
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