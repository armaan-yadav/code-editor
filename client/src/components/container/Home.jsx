import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearchengin } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { motion } from "framer-motion";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
const Home = () => {
    const [isSideMenu, setIsSideMenu] = useState(false);
    const [user, setUser] = useState();
    return (
        <>
            <div
                className={`w-2 min-h-screen max-h-screen bg-secondary relative ${isSideMenu ? `w-2` : `flex-[.3] xl:flex-[.2] text-white`
                    } duration-300 px-3 py-6`}
            >
                {/* anchor for show/hide */}
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="absolute text-white -right-6 top-2 bg-secondary cursor-pointer text-xl p-1 rounded-tr-lg rounded-br-lg"
                    onClick={() => setIsSideMenu(!isSideMenu)}
                >
                    {" "}
                    <HiChevronDoubleLeft
                        className={`${isSideMenu && `rotate-180`} duration-300`}
                    />
                </motion.div>
                {/* side-bar items */}
                <div className="overflow-hidden w-full flex flex-col gap-4">
                    <Link to={"/home"}>
                        <img src={logo} alt="logo" className="w-72 h-auto object-contain" />
                    </Link>

                    <Link
                        to={"/newProject"}
                        className="w-full text-center py-2 border-gray-200 hover:border-2 rounded-md duration-200
                    group"
                    >
                        <p className="text-gray-400 group-hover:text-gray-200">
                            Start Coding
                        </p>
                    </Link>

                    <Link
                        to={"/home/projects"}
                        className="flex items-center gap-2 w-full justify-center text-gray-400"
                    >
                        <MdHome /> Home
                    </Link>
                </div>
            </div>
            <div className=" flex-1 min-h-screen max-h-screen w-full h-full  overflow-y-scroll  flex items-start justify-start px-4 md:px-12 py-1 md:py-8 ">
                <div className="w-full flex h-[46px] gap-2 bg-secondary ">
                    {/* search bar */}
                    <div className="flex items-center w-full gap-1 px-2 text-white border-[1px] border-gray-300 rounded-lg ">
                        <FaSearchengin className="text-2xl text-white" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="text-xl flex-1 outline-none px-2  py-1.5 placeholder:text-gray-600 bg-transparent  "
                        />
                    </div>
                    {/* profile section */}
                    <div className="h-full   rounded-md flex items-center justify-center">
                        {!user ? (
                            <Link to={"/auth"} className="h-full">
                                <motion.div
                                    whileTap={{ scale: 0.8 }}
                                    className="text-white bg-emerald-500 hover:bg-emerald-700 duration-200 px-3 h-full flex items-center rounded-md"
                                >
                                    SignUp
                                </motion.div>
                            </Link>
                        ) : (
                            <>
                                {" "}
                                <img
                                    src="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-760x428,f_auto,q_auto:best/mpx/2704722219/2023_12/1702920776078_tdy_pop_8a_jones_brad_pitt_231218_1920x1080-o5zbmx.jpg"
                                    alt="user-profile"
                                    className="h-full w-[50px] object-cover rounded-md"
                                />
                                <RiArrowDropDownLine className="text-[40px] text-white" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
