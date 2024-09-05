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
      // Aquí iría la lógica para obtener los animales
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

  const animalesFiltrados = animales
    .filter(animal => {
      const coincideBusqueda = animal.name.toLowerCase().includes(busqueda.toLowerCase());
      const coincideUbicacion = filtro.ubicacion ? animal.location === filtro.ubicacion : true;
      const coincideTipo = filtro.tipo ? animal.type === filtro.tipo : true;
      const coincideEdad = filtro.edad ? animal.age === filtro.edad : true;
      return coincideBusqueda && coincideUbicacion && coincideTipo && coincideEdad;
    })
    .sort((a, b) => {
      if (ordenar === 'reciente') {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      } else if (ordenar === 'masAdoptados') {
        return b.adoptionCount - a.adoptionCount;
      }
      return 0;
    });

  return (
    <div>
      <h2>Animales Disponibles para Adopción</h2>
      <input type="text" placeholder="Buscar por nombre" value={busqueda} onChange={manejarCambioBusqueda} />
      <div>
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={filtro.ubicacion}
          onChange={manejarCambioFiltro}
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo de animal"
          value={filtro.tipo}
          onChange={manejarCambioFiltro}
        />
        <input
          type="text"
          name="edad"
          placeholder="Edad"
          value={filtro.edad}
          onChange={manejarCambioFiltro}
        />
      </div>
      <div>
        {animalesFiltrados.map(animal => (
          <div key={animal.id}>
            <img src={animal.photo} alt={animal.name} width="100" />
            <h3>{animal.name}</h3>
            <p>Ubicación: {animal.location}</p>
            <p>Edad: {animal.age}</p>
            <p>Estado de salud: {animal.healthStatus}</p>
            <p>{animal.adopted ? 'Ya adoptado' : 'Disponible para adopción'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilAnimal;

