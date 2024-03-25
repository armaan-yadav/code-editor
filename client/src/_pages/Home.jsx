import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdHome } from "react-icons/md";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
const Home = () => {
    const [isSideMenu, setIsSideMenu] = useState(false);
    const user = useSelector(state => state.user);
    return (
        <>
            <Sidebar isSideMenu={isSideMenu} setIsSideMenu={setIsSideMenu} />
            <div className=" flex-1 min-h-screen max-h-screen w-full h-full  overflow-y-scroll  flex items-start justify-start px-4 md:px-12 py-1 md:py-8 ">
                <div className="w-full flex h-[46px] gap-2 bg-secondary ">
                    <Searchbar />
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
