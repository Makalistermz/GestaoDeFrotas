import { Routes, Route } from 'react-router'
import './App.css'
import Login from './pages/login'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
