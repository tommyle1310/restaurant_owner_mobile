// filepath: /path/to/your/project/src/services/socket.js
import io from "socket.io-client";

const socket = io("https://493d-171-253-248-54.ngrok-free.app"); // Replace with your backend URL

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("incomingOrder", (order) => {
  console.log("New order received:", order);
  // Handle the incoming order notification
});

export default socket;
