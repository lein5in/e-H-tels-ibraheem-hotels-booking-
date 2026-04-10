import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Recherche from './pages/Recherche'
import Reservations from './pages/Reservations'
import Gestion from './pages/Gestion'
import DetailChambre from './pages/DetailChambre'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Recherche />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/chambre/:id" element={<DetailChambre />} />
      </Routes>
    </div>
  )
}