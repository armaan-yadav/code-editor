import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { imageDb } from "../../config/firebase.config";
import { toast } from "react-toastify";
import { removeUserPhoto, updateUserProfile } from "../../utils/helper";

const ImageUpload = ({ user, setPhotoURL }) => {
  const [currentImgUrl, setCurrentImgUrl] = useState(user?.photoURL);
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState("0");
  const uploadImage = async () => {
    const imgRef = ref(imageDb, `files/${v4()}`);
    const uploadTask = uploadBytesResumable(imgRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress =
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        toast.error("Error while uploading image! try again");
      },
      () => {
        toast.success("Image uploaded successfully");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setPhotoURL(downloadURL);
          setCurrentImgUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (img) uploadImage();
  }, [img]);
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-5 px-2 ">
      {currentImgUrl ? (
        <img src={currentImgUrl || user?.photoURL} />
      ) : (
        <p className="bg-primaryText text-primary w-full h-[200px]  rounded-md flex items-center justify-center py-1.5 text-[5rem]">
          {user?.displayName[0]}
        </p>
      )}
      {user?.photoURL && (
        <button
          className="bg-red-400 py-2 hover:bg-red-500 duration-200 rounded-md w-full text-sm"
          onClick={() => {
            setCurrentImgUrl(null);
            removeUserPhoto();
          }}
        >
          Remove Profile Photo
        </button>
      )}

      <div className="flex flex-col w-full">
        <input
          type="file"
          name="fileUpload"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {img && (
          <>
            {/* <button
              className="bg-emerald-400 py-1 rounded-md my-2 hover:bg-emerald-500 duration-200"
              onClick={() => {
                uploadImage();
              }}
            >
              Upload
            </button> */}
            <div className="h-[4px] w-full bg-white my-2">
              <div
                className={`h-full w-[${parseInt(
                  progress
                )}%] bg-emerald-400 duration-400 ${
                  progress == "0" && `hidden`
                }`}
              ></div>
            </div>
            {progress + " %"}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
