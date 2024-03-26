import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUserOut } from '../utils/helper';
import { removeUser } from '../redux/userSlice/userSlice';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { motion } from "framer-motion"
import { fadeInOut } from "../animatons/index"
import defaultAvatar from "../../public/assets/defaultIAvatar.jpg"
const UserProfile = ({ showLogoutMenu, setShowLogoutMenu }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    return (
        <>

            <div className="flex h-full items-center justify-center gap-2 "

            >
                <motion.img whileHover={{ scale: 1.2 }}
                    src={user.photoURL ? user.photoURL : defaultAvatar}
                    alt="user-profile"
                    className="h-full w-[50px] object-cover rounded-md"
                />
                <RiArrowDropDownLine className={`text-[40px]  text-white ${showLogoutMenu && `rotate-180`} duration-200 bg-secondary rounded-lg`}
                    onClick={() => setShowLogoutMenu(!showLogoutMenu)} />
            </div>
            {showLogoutMenu &&
                <motion.div
                    {...fadeInOut}
                    className="absolute top-[120%] right-0 text-primaryText w-[150%] flex flex-col bg-secondary  gap-1.5 rounded-lg overflow-hidden py-1">
                    <button className="px-1 border-b-[1px]  hover:bg-emerald-500 hover:text-white  duration-200">Projects</button>
                    <button className="px-1 border-b-[1px]  hover:bg-emerald-500 hover:text-white  duration-200">Collections</button>
                    <button className="px-1 border-b-[1px]  hover:bg-emerald-500 hover:text-white  duration-200">Profile</button>
                    <button className="px-1 border-b-[1px]  hover:bg-emerald-500 hover:text-white  duration-200 "
                        onClick={() => {
                            signUserOut();
                            dispatch(removeUser())
                        }}
                    >Sign Out</button>
                </motion.div>
            }
        </>
    )
}

export default UserProfile