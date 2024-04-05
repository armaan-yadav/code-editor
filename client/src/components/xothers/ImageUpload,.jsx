import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { imageDb } from "../../config/firebase.config";
import { toast } from "react-toastify";
import { updateUserPhoto } from "../../utils/helper";

const ImageUpload = () => {
  const [img, setImg] = useState("");
  const [url, setUrl] = useState(null);
  const uploadImage = async () => {
    // console.log("first");
    const imgRef = ref(imageDb, `files/${v4()}`);
    // await uploadBytes(imgRef, img)
    //   .then(async (e) => {
    //     toast.success("Image uploaded successfully");
    //     setImagePath(e.metadata.fullPath);
    //     getDownloadURL(ref(imageDb, imgPath)).then((e) => setUrl(e));
    //   })
    //   .catch(() => {
    //     toast.error("Error while uploading image");
    //   });
    const uploadTask = uploadBytesResumable(imgRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        // Handle unsuccessful uploads
        toast.error("Error while uploading image! try again");
      },
      () => {
        toast.success("Image uploaded successfully");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
          updateUserPhoto(downloadURL);
        });
      }
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      hehe
      <input
        type="file"
        name="fileUpload"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button
        onClick={() => {
          uploadImage();
        }}
      >
        Upload
      </button>
      {url && <img src={url} />}
    </div>
  );
};

export default ImageUpload;
