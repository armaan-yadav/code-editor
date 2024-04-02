import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./_pages/Home";
import Auth from "./_auth/Auth";
import { auth, db } from "./config/firebase.config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import Spinner from "./components/Spinner";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice/userSlice";
import NewProject from "./_pages/NewProject";
import { ToastContainer } from "react-toastify";
import { setProjects } from "./redux/userSlice/projectSlice";
import { ProviderId } from "firebase/auth";
import ProjectWithId from "./_pages/ProjectWithId";

const App = () => {
  console.log("Hello");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
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
  useEffect(() => {
    const porjectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    );
    const unsubscribe = onSnapshot(porjectQuery, (querySnaps) => {
      const projectList = querySnaps.docs.map((doc) => doc.data());
      dispatch(setProjects(projectList));
    });
    return () => unsubscribe;
  });
  return isLoading ? (
    <div className="flex items-center justify-center h-[100vh] w-screen ">
      <Spinner />
    </div>
  ) : (
    <>
      <ToastContainer position="bottom-right" />
      <div className="w-[100vw] h-[100vh] flex items-start justify-start overflow-hidden">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/newProject"
            element={<NewProject data={{}} editable={true} />}
          />
          <Route path="/project/:id" element={<ProjectWithId />} />

          {/* set default path if no route matches */}
          {/* <Route path='*' element={<Home />} /> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
