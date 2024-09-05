import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReporteAnimal from "./componentes/ReporteAnimal";
import PerfilAnimal from "./componentes/PerfilAnimal";
import './App.css'

function App() {

  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/reporte-animal">Reportar Animal</Link></li>
          <li><Link to="/perfil-animal">Perfil Animal</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/reporte-animal" element={<ReporteAnimal />} />
        <Route path="/perfil-animal" element={<PerfilAnimal />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
