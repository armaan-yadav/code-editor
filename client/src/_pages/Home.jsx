import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";
import Projects from "../components/Projects";
const Home = () => {
    const [isSideMenu, setIsSideMenu] = useState(false);
    const user = useSelector(state => state.user.user);
    const projects = useSelector(state => state.projects.projects)
    return (
        <>
            <Sidebar isSideMenu={isSideMenu} setIsSideMenu={setIsSideMenu} />
            <div className=" flex-1 min-h-screen max-h-screen w-full h-full  gap-4 overflow-y-scroll  flex items-start justify-start  py-1 md:py-8 flex-col">
                <div className="w-full flex h-[46px] gap-2 px-4 md:px-12">
                    <Searchbar />
                    {/* profile section */}
                    <div className="h-full   rounded-md flex items-center justify-center relative">
                        {user == null ? (
                            <Link to={"/auth"} className="h-full">
                                <motion.div
                                    whileTap={{ scale: 0.8 }}
                                    className="text-white bg-emerald-500 hover:bg-emerald-700 duration-200 px-3 h-full flex items-center rounded-md"
                                >
                                    SignUp
                                </motion.div>
                            </Link>
                        ) : (
                            <UserProfile user={user} />
                        )}
                    </div>
                </div>
                <Projects projects={projects} />
            </div>

        </>
    );
};

export default Home;
