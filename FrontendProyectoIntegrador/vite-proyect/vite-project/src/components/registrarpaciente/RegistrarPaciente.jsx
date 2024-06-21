import React, { useState, useEffect } from 'react';

const RegistrarPaciente = ({ setVisibleComponent, paciente = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    apellido: '',
    nombre: '',
    dni: '',
    fechaIngreso: '',
    domicilio: {
      calle: '',
      localidad: '',
      provincia: ''
    }
  });

  useEffect(() => {
    if (paciente) {
      setFormData(paciente);
    }
  }, [paciente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['calle', 'localidad', 'provincia'].includes(name)) {
      setFormData(prevState => ({
        ...prevState,
        domicilio: {
          ...prevState.domicilio,
          [name]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `http://localhost:8080/paciente/${paciente.id}` : 'http://localhost:8080/paciente';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar paciente');
      }

      const responseData = await response.json();
      alert(isEditing ? 'Paciente actualizado con éxito' : 'Paciente registrado con éxito');
      setVisibleComponent(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar paciente: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>{isEditing ? 'Editar Paciente' : 'Registrar Paciente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DNI</label>
          <input
            type="text"
            className="form-control"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Ingreso</label>
          <input
            type="date"
            className="form-control"
            name="fechaIngreso"
            value={formData.fechaIngreso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Calle</label>
          <input
            type="text"
            className="form-control"
            name="calle"
            value={formData.domicilio.calle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Localidad</label>
          <input
            type="text"
            className="form-control"
            name="localidad"
            value={formData.domicilio.localidad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Provincia</label>
          <input
            type="text"
            className="form-control"
            name="provincia"
            value={formData.domicilio.provincia}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{isEditing ? 'Actualizar' : 'Registrar'}</button>
        <button type="button" className="btn btn-secondary" onClick={() => setVisibleComponent(null)}>Cerrar</button>
      </form>
    </div>
  );
};

export default RegistrarPaciente;
