import React, { useContext } from 'react'
import logo from "/assets/logo.svg"
import defaultAvatar from "/assets/defaultIAvatar.jpg"
import { motion } from "framer-motion"
import { FaChevronDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const NewProjectHeader = () => {
    const user = useSelector(state => state.user.user);
    console.log(user)
    return (
        <div className='text-white  min-h-[66px] h-[66px]  w-full bg-secondary flex justify-between items-center px-3'>
            <div>
                <Link to={"/home"}>  <img src={logo} alt="" /></Link>
            </div>
            <div className='flex gap-2 items-center'>
                <div className='bg-emerald-400 text-primary font-[600] px-2 py-1 rounded-md hover:bg-emerald-500 duration-200 hover:text-white cursor-pointer'>SAVE</div>
                <motion.img whileTap={{ scale: 0.9 }} src={user?.photoURL ? user.photoURL : defaultAvatar} alt="" className='h-[75pxpx] w-[50px] object-cover rounded-md cursor-pointer' />
                <FaChevronDown className='bg-secondary h-full text-[1rem] text-white cursor-pointer' />
            </div>
        </div>
    )
}

export default NewProjectHeader;