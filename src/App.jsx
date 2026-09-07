import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import ChiSiamo from './pages/ChiSiamo.jsx'
import Appartamenti from './pages/Appartamenti.jsx'
import Territorio from './pages/Territorio.jsx'
import PetFriendly from './pages/PetFriendly.jsx'
import Esperienze from './pages/Esperienze.jsx'
import ComeRaggiungerci from './pages/ComeRaggiungerci.jsx'
import Contatti from './pages/Contatti.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'

// Route paths are declared once in src/routes.js; this table maps them to
// components. Keep the two in step — a unit test asserts every route in
// ROUTES has an element here.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/appartamenti" element={<Appartamenti />} />
        <Route path="/territorio" element={<Territorio />} />
        <Route path="/pet-friendly" element={<PetFriendly />} />
        <Route path="/esperienze" element={<Esperienze />} />
        <Route path="/come-raggiungerci" element={<ComeRaggiungerci />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
