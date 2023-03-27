import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Page/Home'
import LoginProfile from './Page/LoginProfile'
import RegisterProfile from './Page/RegisterProfile'
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
