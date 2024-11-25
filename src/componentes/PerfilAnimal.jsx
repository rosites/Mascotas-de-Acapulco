import React, { useState, useEffect } from 'react';
import '../App.css'

const PerfilAnimal = () => {
  const [animales, setAnimales] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState({
    ubicacion: '',
    tipo: '',
    edad: '',
  });
  const [ordenar, setOrdenar] = useState('reciente');

  useEffect(() => {
    const obtenerAnimales = async () => {
      const listaDeAnimales = JSON.parse(window.localStorage.getItem("reporte"))
      setAnimales(listaDeAnimales)
    };
    obtenerAnimales();
  }, []);

  const manejarCambioBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const manejarCambioFiltro = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const manejarCambioOrdenar = (e) => {
    setOrdenar(e.target.value);
  };

  const animalesCoincidencia = animales.filter(animal => {
    if (busqueda === "") {
      return animal
    }

    if (animal.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())) {
      return animal
    }

  })

  return (
    <div>
      <h2>Animales Disponibles para Adopción</h2>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        style={{ height: "35px", width: "400px", borderRadius: "5px" }}
        onChange={manejarCambioBusqueda} />
  
      <div style={{ display: "flex" , flexDirection: "column", gap: "10px", marginTop: "10px"}}>

        {animalesCoincidencia.length === 0 && (
          <h3>No hay animales.</h3>
        )}
        {animalesCoincidencia.map((animal, index) => (
          <div key={index} style={{ background: "grey", color: "white",borderRadius: "15px", padding: "10px" }}>
            <h3>{animal.nombre}</h3>
            <p>Tipo: {animal.tipo}</p>
            <p>Raza: {animal.raza}</p>
            <p>Ubicación: {animal.ubicacion}</p>
            <p>Estado de salud: {animal.estadoSalud}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilAnimal;

