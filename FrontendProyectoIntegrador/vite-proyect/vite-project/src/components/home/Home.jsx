import React, { useState } from 'react';
import './home.css';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import RegistrarOdontologo from './RegistrarOdontologo';
import RegistrarPaciente from './RegistrarPaciente';

const Home = ({ setVisibleComponent }) => {
  const [modalShow, setModalShow] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleShowModal = (component) => {
    setCurrentComponent(component);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setCurrentComponent(null);
  };

  return (
    <Container className="cuerpo mt-5">
      <Row className="justify-content-center mb-4 cuerpo1">
        <Col md={8} className="text-center">
          <h1 className="display-4">Bienvenido a la Clínica Odontológica</h1>
          <p className="lead">Ofrecemos los mejores servicios para el cuidado de tu salud dental.</p>
          <img src="tu-imagen.jpg" alt="Clínica Odontológica" className="imgcuerpo"/>
        </Col>
      </Row>
      <Row className="justify-content-center cuerpo2">
        <Col md={4} className="mb-4">
          <Card className="text-center">
            <Card.Header as="h5" className="header-card">Odontólogos</Card.Header>
            <Card.Body>
              <Button variant="primary" className="button-option" onClick={() => setVisibleComponent({ action: 'listarOdontologos' })}>
                Listar Odontólogos
              </Button>
              <Button variant="secondary" className="button-option" onClick={() => handleShowModal('registrarOdontologo')}>
                Registrar Odontólogo
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center">
            <Card.Header as="h5" className="header-card">Pacientes</Card.Header>
            <Card.Body>
              <Button variant="primary" className="button-option" onClick={() => setVisibleComponent({ action: 'listarPacientes' })}>
                Listar Pacientes
              </Button>
              <Button variant="secondary" className="button-option" onClick={() => handleShowModal('registrarPaciente')}>
                Registrar Paciente
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={modalShow} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentComponent === 'registrarOdontologo' ? 'Registrar Odontólogo' : 'Registrar Paciente'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentComponent === 'registrarOdontologo' && <RegistrarOdontologo setVisibleComponent={setVisibleComponent} />}
          {currentComponent === 'registrarPaciente' && <RegistrarPaciente setVisibleComponent={setVisibleComponent} />}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Home;
