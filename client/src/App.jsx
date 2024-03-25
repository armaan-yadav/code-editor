import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './_pages/Home'
import Auth from './_auth/Auth'
import { auth } from './config/firebase.config'

const App = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const user = auth.onAuthStateChanged(userCred => {
      if (userCred) {
        console.log(userCred)
      }
      else {
        navigate("/auth")
      }
    })
  }, [])
  return (
    <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>

      <Routes>
        <Route path='/home/*' element={<Home />} />
        <Route path='/auth' element={<Auth />} />

        {/* set default path if no route matches */}
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App