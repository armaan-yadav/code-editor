import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './_pages/Home'
import Auth from './_auth/Auth'
import { auth, db } from './config/firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import Spinner from './components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/userSlice/userSlice'

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  console.log(user)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userCred => {
      console.log(userCred.providerData[0])
      if (userCred) {
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData?.[0]).then(e => {
          setIsLoading(true)
          dispatch(setUser(userCred?.providerData?.[0]))
          setIsLoading(false)
        })
      }
      // else {
      //   navigate("/auth")
      //   setIsLoading(false)
      // }
    })

    //we can also use setInterval and call  the loading animation

    //cleanup funciton
    return () => unsubscribe();
  }, [])
  return isLoading ? <div className='flex items-center justify-center h-screen w-screen '>
    <Spinner />
  </div> : (
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