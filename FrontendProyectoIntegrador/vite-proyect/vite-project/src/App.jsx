import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import ListaOdontologo from './components/listaOdo/ListaOdontologos';
import RegistrarPaciente from './components/registrarpaciente/RegistrarPaciente';
import ListaPaciente from './components/listaPaciente/ListaPaciente';
import RegistrarOdontologo from './components/agregarodontologos/RegistrarOdontologo';

function App() {
  const [visibleComponent, setVisibleComponent] = useState(null);

  const renderComponent = () => {
    if (visibleComponent) {
      switch (visibleComponent.action) {
        case 'listarOdontologos':
          return <ListaOdontologo setVisibleComponent={setVisibleComponent} />;
        case 'listarPacientes':
          return <ListaPaciente setVisibleComponent={setVisibleComponent} />;
        case 'registrarPaciente':
          return <RegistrarPaciente setVisibleComponent={setVisibleComponent} />;
        case 'editarPaciente':
          return <RegistrarPaciente setVisibleComponent={setVisibleComponent} paciente={visibleComponent.data} />;
        case 'registrarOdontologo':
          return <RegistrarOdontologo setVisibleComponent={setVisibleComponent} />;
        case 'editarOdontologo':
          return <RegistrarOdontologo setVisibleComponent={setVisibleComponent} odontologo={visibleComponent.data} />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div>
      <Header />
      <Home setVisibleComponent={setVisibleComponent} />
      <About />
      {renderComponent()}
    </div>
  );
}

export default App;
