import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import UserCard from "../../components/xothers/UserCard";
import CodeEditor from "../../components/xothers/CodeEditor";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { initSocket } from "../../utils/socket";
import logo from "/assets/logo.svg";
const LiveCodeEditor = () => {
  const codeRef = useRef(null);
  const navigate = useNavigate();
  //states
  const { roomId } = useParams();
  const location = useLocation();
  //connected users (to be linked with context)
  const [users, setUsers] = useState([
    // { socketId: 1, username: "armaan" },
    // { socketId: 1, username: "kajal" },
  ]);
  //handling copy to clipboard
  const onCopy = () => {
    toast.success("Copied to clipboard");
  };
  //handling web socket connection
  const socketRef = useRef(null);
  const init = async () => {
    //initiating a new websocket connection
    socketRef.current = await initSocket();

    //handling errors
    const handleError = (err) => {
      console.log(err);
      toast.error("Error while establishing a connection");
      navigate("/");
    };
    socketRef.current.on("connect_error", (err) => handleError(err));
    socketRef.current.on("connect_failed", (err) => handleError(err));

    //joining the server
    socketRef.current.emit("join", {
      roomId,
      username: location.state?.username,
    });

    //custom event-> receiving data from server on joining
    socketRef.current.on("joined", ({ clients, username, socketId }) => {
      username !== location.state?.username &&
        toast.success(`${username} joined`);
      setUsers(clients);

      socketRef.current.emit("code-sync", {
        code: codeRef.current,
        socketId,
      });
    });
    //custom event->receiving data from server on disconnecting
    socketRef.current.on("disconnected", ({ socketId, username }) => {
      toast.error(`${username} left`);
      setUsers((prev) => {
        return prev.filter((client) => client.socketId != socketId);
      });
    });
  };
  useEffect(() => {
    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off();
      }
    };
  }, []);
  return (
    <div className="h-full w-full flex gap-2 pl-10 text-white">
      <div className="h-full  w-[300px] flex flex-col gap-8 ">
        <div className="w-full flexC flex-col text-lg font-semibold">
          <img src={logo} alt="logo" />
          Live Editor
        </div>
        <div className="flex flex-col gap-2 h-full">
          <div className="flex-1 flex flex-col gap-3">
            <div className="w-full max-sm:hidden">
              <div className="bg-white h-[1px] w-full my-2"></div>
              Connected Users :
            </div>
            {users?.map((user, index) => (
              <UserCard username={user?.username} key={index} />
            ))}
          </div>
          <CopyToClipboard text={roomId} onCopy={onCopy}>
            <button className="w-full bg-emerald-400 py-2 rounded-md hover:bg-emerald-500 active:bg-emerald-500 duration-200">
              Copy Room Id
            </button>
          </CopyToClipboard>
          <button
            className="w-full bg-red-400 py-2 rounded-md hover:bg-red-500 active:bg-red-500 duration-200"
            onClick={() => {
              navigate("/live-coding");
            }}
          >
            Leave Room
          </button>
        </div>
      </div>
      <div className="h-full w-full bg-red-900">
        <CodeEditor
          roomId={roomId}
          socketRef={socketRef}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default LiveCodeEditor;
