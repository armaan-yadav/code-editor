import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/container'
import Auth from './components/container/Auth'

const App = () => {
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