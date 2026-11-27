import { Routes, Route } from 'react-router'
import './App.css'
import Login from './pages/login'
import SolicitarAlteracaoSenha from './pages/solicitarAlteracaoSenha'
import AlterarSenha from './pages/alterarSenha'
import RotaProtegida from './components/rotaProtegida'
import Home from './pages/home'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/solicitar/troca-senha' element={<SolicitarAlteracaoSenha />} />
        <Route path='/trocar-senha' element={<AlterarSenha />} />

        <Route element={<RotaProtegida />}>
          <Route path='/home' element={<Home />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
