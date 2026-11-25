import { Routes, Route } from 'react-router'
import './App.css'
import Login from './pages/login'
import SolicitarAlteracaoSenha from './pages/solicitarAlteracaoSenha'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/solicitar/troca-senha' element={<SolicitarAlteracaoSenha />} />
      </Routes>
    </>
  )
}

export default App
