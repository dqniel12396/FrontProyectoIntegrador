import React, { useState, useEffect } from 'react';
import BotonEliminar from '../botoneliminar/BotonEliminar';
import BotonEditar from '../botoneditar/BotonEditar';

const ListaOdontologos = ({ setVisibleComponent }) => {
  const [odontologos, setOdontologos] = useState([]);

  useEffect(() => {
    const fetchOdontologos = async () => {
      try {
        const response = await fetch('http://localhost:8080/odontologo');
        const data = await response.json();
        setOdontologos(data);
      } catch (error) {
        console.error("Error fetching odontologos:", error);
      }
    };

    fetchOdontologos();
  }, []);

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/odontologo/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar odontólogo');
      }

      setOdontologos(odontologos.filter(odontologo => odontologo.id !== id));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar odontólogo: ' + error.message);
    }
  };

  const handleEditar = (odontologo) => {
    setVisibleComponent({ action: 'editarOdontologo', data: odontologo });
  };

  const handleClose = () => {
    setVisibleComponent(null);
  };

  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <button onClick={handleClose} style={closeButtonStyle}>Cerrar</button>
        <h2 style={titleStyle}>Lista de Odontólogos</h2>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Apellido</th>
              <th scope="col">Nombre</th>
              <th scope="col">Matrícula</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {odontologos.map(odontologo => (
              <tr key={odontologo.id}>
                <th scope="row">{odontologo.id}</th>
                <td>{odontologo.apellido}</td>
                <td>{odontologo.nombre}</td>
                <td>{odontologo.nroMatricula}</td>
                <td>
                  <BotonEliminar onClick={() => handleEliminar(odontologo.id)} />
                  <BotonEditar onClick={() => handleEditar(odontologo)} />
                </td>
              </tr>
            ))}
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

export default ListaOdontologos;
