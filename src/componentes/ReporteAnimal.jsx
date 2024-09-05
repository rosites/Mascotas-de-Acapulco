import React, { useState } from 'react';
import '../App.css'

const ReportarAnimal = () => {
  const [datosAnimal, setDatosAnimal] = useState({
    nombre: '',
    ubicacion: '',
    estadoSalud: '',
  });

  const [error, setError] = useState(null);

  const manejarCambio = (e) => {
    setDatosAnimal({ ...datosAnimal, [e.target.name]: e.target.value });
  };

  const validarDatos = () => {
    if (!datosAnimal.nombre || !datosAnimal.ubicacion || !datosAnimal.estadoSalud) {
      setError('Todos los campos son obligatorios');
      return false;
    }
    setError(null);
    return true;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarDatos()) return;

    try {
      alert('Animal reportado con éxito');
      setDatosAnimal({ nombre: '', ubicacion: '', estadoSalud: '' });
    } catch (error) {
      setError('Ocurrió un error al reportar el animal');
    }
  };

  return (
    <form onSubmit={manejarEnvio} className='card'>
      <h2>Reportar Animal Callejero</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del animal"
        value={datosAnimal.nombre}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="ubicacion"
        placeholder="Ubicación"
        value={datosAnimal.ubicacion}
        onChange={manejarCambio}
      />
      <textarea
        name="estadoSalud"
        placeholder="Estado de salud"
        value={datosAnimal.estadoSalud}
        onChange={manejarCambio}
      />
      <button type="submit">Reportar Animal</button>
    </form>
  );
};

export default ReportarAnimal;

