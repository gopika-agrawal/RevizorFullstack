import { Route, Routes } from 'react-router-dom'
import Navbar from './acomponents/Navbar'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { useState } from 'react'
import PrivateRoute from './acomponents/PrivateRoute'
import Dashboard from './Pages/Dashboard'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div >

      <div >

        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>


        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/dashboard' element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard/>
            </PrivateRoute>
          } />
        </Routes>


      </div>

    </div>
  )
}

export default App
