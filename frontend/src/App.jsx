import { Route, Routes } from 'react-router-dom'
import Navbar from './acomponents/Navbar'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { useState } from 'react'
import PrivateRoute from './acomponents/PrivateRoute'
import Dashboard from './Pages/Dashboard'
import LandingPage from './Pages/LandingPage'
import { SwatchBook } from 'lucide-react'
import Home from './Pages/Home'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");



  return (

      <div className='min-h-screen flex flex-col'>

        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        <main className='flex-1'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          } />
          <Route
            path="/login"
            element={
              isLoggedIn
                ? <Navigate to="/home" replace />
                : <Login setIsLoggedIn={setIsLoggedIn}/>
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn
                ? <Navigate to="/home" replace />
                : <Signup setIsLoggedIn={setIsLoggedIn}/>
            }
          />
          <Route path='/dashboard/*' element={
            <PrivateRoute>
            <Dashboard/>
            </PrivateRoute>
          } />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>

       </main>


        <footer className='flex flex-col sm:flex-row justify-center items-center gap-4 bg-white/70 backdrop-blur-xl border border-[#dfeceb] rounded-full px-6 py-3 w-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_0_40px_rgba(39,199,184,0.20)] hover:-translate-y-1 transition-all duration-300'>
          
          <p className='text-[#07122b] font-semibold tracking-wide text-sm md:text-base'>
            Simplifying the Complexity
          </p>
          <div className='w-10 h-10 rounded-full bg-[#e9fbf8] flex items-center justify-center text-[#27c7b8] shadow-[0_0_20px_rgba(39,199,184,0.25)]'>
            <SwatchBook className='w-5 h-5'/>
          </div>

        </footer>


      </div>

  )
}

export default App
