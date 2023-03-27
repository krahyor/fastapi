import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './api/Home'
import LoginProfile from './api/LoginProfile'
import RegisterProfile from './api/RegisterProfile'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/loginprofile' element={<LoginProfile/>}/>
        <Route path='/registerprofile' element={<RegisterProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
