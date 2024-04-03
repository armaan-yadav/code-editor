import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Searchbar from "../components/headers/homeheader/Searchbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import UserProfile from "../components/xothers/UserProfile";
import Projects from "../components/projects/Projects";
import HomeHeader from "../components/headers/homeheader/HomeHeader";
const Home = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  const projects = useSelector((state) => state.projects.projects);
  return (
    <>
      <Sidebar isSideMenu={isSideMenu} setIsSideMenu={setIsSideMenu} />
      <div className=" flex-1 min-h-screen max-h-screen w-full h-full  gap-4 overflow-y-scroll  flex items-start justify-start  py-1 md:py-8 flex-col">
        <HomeHeader user={user} />
        <Projects projects={projects} />
      </div>
    </>
  );
};

export default Home;
