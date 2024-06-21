import React, { useState, useEffect } from 'react';
import BotonEliminar from '../botoneliminar/BotonEliminar';
import BotonEditar from '../botoneditar/BotonEditar';
import RegistrarPaciente from '../registrarpaciente/RegistrarPaciente';

const ListaPaciente = ({ setVisibleComponent }) => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('http://localhost:8080/paciente');
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error fetching pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/paciente/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar paciente');
      }

      setPacientes(pacientes.filter(paciente => paciente.id !== id));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar paciente: ' + error.message);
    }
  };

  const handleEditar = (paciente) => {
    setVisibleComponent({ action: 'editarPaciente', data: paciente });
  };

  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <button onClick={() => setVisibleComponent(null)} style={closeButtonStyle}>Cerrar</button>
        <h2 style={titleStyle}>Lista de Pacientes</h2>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Apellido</th>
              <th scope="col">Nombre</th>
              <th scope="col">DNI</th>
              <th scope="col">Fecha Ingreso</th>
              <th scope="col">Domicilio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(paciente => {
              const domicilio = paciente.domicilio || {};
              return (
                <tr key={paciente.id}>
                  <th scope="row">{paciente.id}</th>
                  <td>{paciente.apellido}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.dni}</td>
                  <td>{paciente.fechaIngreso}</td>
                  <td>{`${domicilio.calle || ''} ${domicilio.numero || ''}, ${domicilio.localidad || ''}, ${domicilio.provincia || ''}`}</td>
                  <td>
                    <BotonEliminar onClick={() => handleEliminar(paciente.id)} />
                    <BotonEditar onClick={() => handleEditar(paciente)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const contentStyle = {
  background: 'white',
  padding: '40px',
  borderRadius: '10px',
  textAlign: 'center',
  position: 'relative',
  width: '80%',
  maxWidth: '800px'
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  cursor: 'pointer'
};

const titleStyle = {
  marginBottom: '20px'
};

export default ListaPaciente;
