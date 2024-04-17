import React, { useEffect } from "react";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "/assets/logo.svg";
import { useSelector } from "react-redux";
import Anchor from "../xothers/Anchor";
import { IoCreateOutline } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { TbSourceCode, TbWorldWww } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa6";
import { signUserOut } from "../../utils/helper";
import { removeUser } from "../../redux/userSlice/userSlice";
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { SideBarLinks } from "../../utils/constants";

const Sidebar = ({ isSideMenu, setIsSideMenu }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setTimeout(() => {
      setIsSideMenu(false);
    }, 1000);
  }, []);
  return (
    <div
      className={`  min-h-screen max-h-screen bg-secondary  ${
        isSideMenu ? `w-[250px]` : `w-[10px] text-white`
      } duration-300 px-3 py-6  justify-between flex flex-col z-[200] absolute`}
    >
      {/* anchor for show/hide */}
      <Anchor isSideMenu={isSideMenu} setIsSideMenu={setIsSideMenu} />
      {/* side-bar items */}
      <div className="overflow-hidden w-full flex flex-col gap-4 ">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-full  object-contain" />
        </Link>

        <p className="text-gray-400 hover:text-gray-200 w-full text-center text-xl">
          Hello, {user?.displayName ? user.displayName : "Friend! "}
        </p>

        <Link
          to={"/newProject"}
          className="w-full text-center py-2 border-gray-200 hover:border-2 rounded-md duration-200
                    group flex items-center justify-center text-xl max-sm:mt-4"
        >
          <p className="text-gray-400 group-hover:text-gray-200 cursor-pointer flex items-center gap-2">
            New Project <IoCreateOutline />
          </p>
        </Link>

        <Link
          to={"/live-coding"}
          className="w-full text-center py-2 border-gray-200 hover:border-2 rounded-md duration-200
                    group flex items-center justify-center text-xl max-sm:mt-4"
        >
          <p className="text-gray-400 group-hover:text-gray-200 cursor-pointer flex items-center gap-2">
            Live Coding
          </p>
        </Link>

        <Link
          to={"/"}
          className="max-sm:mt-6 text-lg flex items-center gap-2 w-full justify-center text-gray-400 hover:text-white duration-200"
        >
          <MdHome className="text-2xl" /> Home
        </Link>
        <Link
          to={"/explore"}
          className="text-lg flex items-center gap-2 w-full justify-center text-gray-400 hover:text-white duration-200"
        >
          <MdExplore className="text-2xl" /> Explore
        </Link>
        <Link
          to={"/profile"}
          className="text-lg flex items-center gap-2 w-full justify-center text-gray-400 hover:text-white duration-200"
        >
          <GiPlagueDoctorProfile className="text-2xl" /> Profile
        </Link>

        {user ? (
          <button
            className="md:hidden px-1 border-b-[1px] bg-emerald-400 rounded-md hover:bg-emerald-500 hover:text-white  duration-200 "
            onClick={() => {
              signUserOut();
              dispatch(removeUser());
              console.log("first");
            }}
          >
            Sign Out
          </button>
        ) : (
          <button className="md:hidden px-1 border-b-[1px] bg-emerald-400 rounded-md hover:bg-emerald-500 hover:text-white  duration-200 ">
            <Link to={"/auth"}>Sign Up</Link>
          </button>
        )}
      </div>

      <div className="w-full flex items-center justify-center flex-col py-1 gap-4 overflow-hidden">
        <Link
          to={"https://github.com/armaan-yadav/codepencil"}
          target="_blank"
          className="text-sm w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white duration-200"
        >
          Source Code
          <TbSourceCode className="text-xl" />{" "}
          <FaGithubAlt className="text-xl" />
        </Link>
        <div className="h-[1px] bg-white w-full"></div>
        <div className="flex flex-col gap-2.5 w-full">
          <p className="text-md text-gray-400 w-full text-center">
            Developed By - <span className="text-white">Armaan Y</span>
          </p>
          <div className="w-full flex items-center gap-3.5 justify-center text-xl text-gray-400">
            <Link target="_blank" to={"https://armaan-yadav.netlify.app/"}>
              <TbWorldWww className="hover:text-white cursor-pointer" />
            </Link>
            <Link target="_blank" to={"https://github.com/armaan-yadav"}>
              <FaGithub className="hover:text-white cursor-pointer" />
            </Link>
            <Link
              target="_blank"
              to={"https://www.linkedin.com/in/armaan-yadav-a58805213/"}
            >
              <FaLinkedinIn className="hover:text-white cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
