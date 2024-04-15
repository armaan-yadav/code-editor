import io from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  return io("https://live-code-editor-production.up.railway.app", options);
  // return io("http://localhost:5100/", options);
};
