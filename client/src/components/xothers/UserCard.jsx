import React from "react";
import Avatar from "react-avatar";
const UserCard = ({ username }) => {
  return (
    <>
      <div className="flex md:w-full gap-3 items-center max-sm:w-[80px]  max-sm:flex-col ">
        <Avatar name={username} size="50" round="15px" />
        <p className="hidden/ md:block/ max-sm:text-sm w-full max-sm:text-center">
          {" "}
          {username}
        </p>
      </div>
    </>
  );
};

export default UserCard;
