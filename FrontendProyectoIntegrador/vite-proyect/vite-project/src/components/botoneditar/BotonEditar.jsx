import React from 'react';

const BotonEditar = ({ onClick, className = '', ...props }) => (
  <button 
    onClick={onClick} 
    className={`btn btn-warning ${className}`} 
    aria-label="Editar" 
    {...props}
  >
    Editar
  </button>
);

export default BotonEditar;
