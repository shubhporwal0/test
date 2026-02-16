import { io } from "socket.io-client";

// Connect to the backend server (ensure port matches server/index.ts)
export const socket = io("http://localhost:4000", {
  autoConnect: false,
});
