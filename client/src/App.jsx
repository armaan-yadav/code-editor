import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./_root/_pages/Home";
import Auth from "./_auth/Auth";
import { auth, db } from "./config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import Spinner from "./components/xothers/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userSlice/userSlice";
import NewProject from "./_root/_pages/NewProject";
import { ToastContainer } from "react-toastify";
import ProjectWithId from "./_root/_pages/ProjectWithId";
import RootLayout from "./_root/RootLayout";
import Explore from "./_root/_pages/Explore";
import Profile from "./_root/_pages/Profile";
import PrivateRoutes from "./_root/PrivateRoutes";
import LiveCoding from "./_root/_pages/LiveCoding";
import LiveCodeEditor from "./_root/_pages/LiveCodeEditor";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setDoc(
          doc(db, "users", userCred?.uid),
          userCred?.providerData?.[0]
        ).then((e) => {
          dispatch(setUser(userCred?.providerData?.[0]));
          setIsLoading(false);
        });
      } else {
        console.log("not logged in");
        setIsLoading(false);
      }
    });
    //cleanup funciton
    return () => unsubscribe();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-[100vh] w-screen ">
      <Spinner />
    </div>
  ) : (
    <>
      <ToastContainer position="bottom-right" autoClose={1750} />
      <div className="w-[100vw] h-[100vh] flex items-start justify-start overflow-hidden ">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoutes />}>
          <Route element={<RootLayout />}>
            <Route index path="/" element={<Home user={user} />} />
            <Route path="/live-coding" element={<LiveCoding />} />
            <Route path="/live-coding/:roomId" element={<LiveCodeEditor />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            path="/newProject"
            element={<NewProject data={{}} editable={true} />}
          />
          <Route path="/project/:id" element={<ProjectWithId />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
