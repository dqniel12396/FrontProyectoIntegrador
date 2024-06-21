import React, { useState, useEffect } from 'react';

const RegistrarOdontologo = ({ setVisibleComponent, odontologo }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nroMatricula: ''
  });

  useEffect(() => {
    if (odontologo) {
      setFormData(odontologo);
    }
  }, [odontologo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/odontologo${odontologo ? `/${odontologo.id}` : ''}`, {
        method: odontologo ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar/actualizar odontólogo');
      }

      alert(`Odontólogo ${odontologo ? 'actualizado' : 'registrado'} con éxito`);
      setVisibleComponent(null);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al ${odontologo ? 'actualizar' : 'registrar'} odontólogo: ` + error.message);
    }
  };

  return (
    <div className="container">
      <h2>{odontologo ? 'Actualizar' : 'Registrar'} Odontólogo</h2>
      <form onSubmit={handleSubmit}>
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
          <label className="form-label">Matrícula</label>
          <input 
            type="text" 
            className="form-control" 
            name="nroMatricula"  
            value={formData.nroMatricula} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">{odontologo ? 'Actualizar' : 'Registrar'}</button>
        <button type="button" className="btn btn-secondary" onClick={() => setVisibleComponent(null)}>Cerrar</button>
      </form>
    </div>
  );
};

export default RegistrarOdontologo;
