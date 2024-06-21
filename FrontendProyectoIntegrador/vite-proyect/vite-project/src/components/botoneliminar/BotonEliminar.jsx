import React from 'react';

const BotonEliminar = ({ onClick, className = '', ...props }) => (
  <button 
    onClick={onClick} 
    className={`btn btn-danger ${className}`} 
    aria-label="Eliminar" 
    {...props}
  >
    Eliminar
  </button>
);

export default BotonEliminar;
