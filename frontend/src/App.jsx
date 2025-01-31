import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Game'
import Milestone from './components/Milestone'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/milestones" element={<Milestone />} />
      </Routes>
    </div>
  )
}