import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './_pages/Home'
import Auth from './_auth/Auth'
import { auth, db } from './config/firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import Spinner from './components/Spinner'
import { useDispatch, } from 'react-redux'
import { setUser } from './redux/userSlice/userSlice'
import NewProject from './_pages/NewProject'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = auth.onAuthStateChanged(userCred => {
      if (userCred) {
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData?.[0]).then(e => {
          dispatch(setUser(userCred?.providerData?.[0]))
          navigate("/home")
          setIsLoading(false)
        })
      }
      else {
        console.log("not logged in");
        setIsLoading(false)
      }
    })

    //cleanup funciton
    return () => unsubscribe();
  }, [])
  return isLoading ? <div className='flex items-center justify-center h-[100vh] w-screen '>
    <Spinner />
  </div> : (
    <div className='w-[100vw] h-[100vh] flex items-start justify-start overflow-hidden'>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/newProject' element={<NewProject />} />

        {/* set default path if no route matches */}
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App