import { Routes, Route } from 'react-router-dom'
import Hub from './components/Hub'
import Onboarding from './components/Onboarding'
import TableStrike from './modules/TableStrike/TableStrike'
import { usePlayer } from './hooks/usePlayer'

export default function App() {
  const { player, savePlayer, resetPlayer } = usePlayer()

  if (!player) {
    return <Onboarding onSave={savePlayer} />
  }

  return (
    <Routes>
      <Route path="/" element={<Hub player={player} onReset={resetPlayer} />} />
      <Route path="/table-strike" element={<TableStrike player={player} />} />
    </Routes>
  )
}
