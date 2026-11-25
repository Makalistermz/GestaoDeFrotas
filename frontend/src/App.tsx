import { Routes, Route } from 'react-router'
import './App.css'
import Login from './pages/login'
import AlterarSenha from './pages/alterarSenha'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/alterarSenha' element={<AlterarSenha />} />
      </Routes>
    </>
  )
}

export default App
