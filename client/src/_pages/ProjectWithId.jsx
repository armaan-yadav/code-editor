import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase.config";
import NewProject from "./NewProject";
import Spinner from "../components/Spinner";
const ProjectWithId = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState();
  const [projectUser, setProjectUser] = useState();
  console.log(projectData);
  const getProject = async (id) => {
    const docRef = collection(db, "Projects");
    const docSnap = await getDocs(query(docRef, where("id", "==", id)));
    if (docSnap.docs) {
      setProjectData(docSnap.docs[0]._document.data.value.mapValue.fields);
      setProjectUser(
        docSnap.docs[0]._document.data.value.mapValue.fields.user.mapValue
          .fields
      );
    } else {
      console.log("couldn't find the project :(");
    }
  };
  useEffect(() => {
    getProject(id);
  }, []);
  return !projectData ? (
    <div className="flex items-center justify-center h-[100vh] w-screen ">
      <Spinner />
    </div>
  ) : (
    <>
      <NewProject
        data={projectData}
        editable={false}
        projectUser={projectUser}
      />
    </>
  );
};

export default ProjectWithId;
