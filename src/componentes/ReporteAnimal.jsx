import React, { useState, useEffect } from 'react';
import '../App.css'

const ReportarAnimal = () => {
  const [datosAnimal, setDatosAnimal] = useState({
    nombre: '',
    tipo: '',
    raza: '',
    ubicacion: '',
    estadoSalud: '',
  });

  const [error, setError] = useState(null);

  const obtenerAnimales = () => {
    const listaDeAnimales = JSON.parse(window.localStorage.getItem("reporte")) || []
    return listaDeAnimales
  };


  const persistirDatos = (animal) => {
    const listaActualAnimales = obtenerAnimales()

    window.localStorage.setItem("reporte", JSON.stringify([...listaActualAnimales, animal]));
  }

  const manejarCambio = (e) => {
    setDatosAnimal({ ...datosAnimal, [e.target.name]: e.target.value });
  };

  const validarDatos = () => {
    if (!datosAnimal.nombre || !datosAnimal.raza || !datosAnimal.tipo || !datosAnimal.ubicacion || !datosAnimal.estadoSalud) {
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
      persistirDatos(datosAnimal)
      alert('Animal reportado con éxito');
      
      setDatosAnimal({ nombre: '', tipo: '', raza: '', ubicacion: '', estadoSalud: '' });
    } catch (error) {
      console.log(error);
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
      <select 
        name="tipo"
        onChange={manejarCambio}
        value={datosAnimal.tipo}>
        <option value="">Selecciona tipo de animal</option>
        <option value="gato">gato</option>
        <option value="perro">perro</option>
      </select>
       <input
        type="text"
        name="raza"
        placeholder="Raza del animal"
        value={datosAnimal.raza}
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

