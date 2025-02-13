// src/hooks/useSocket.ts
import { useEffect } from "react";
import socket from "@/src/services/socket";

interface Order {
  _id: string;
  customer_id: string;
  total_amount: number;
  status: string;
}

export const useSocket = (
  restaurantId: string,
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>,
  sendPushNotification: (order: Order) => void
) => {
  useEffect(() => {
    if (!restaurantId) {
      console.log("Please provide a restaurant ID");
      return;
    }

    // Function to join the restaurant's room
    socket.emit("joinRoom", restaurantId);

    // Listen for incoming orders
    socket.on("incomingOrder", (order: Order) => {
      setOrders((prevOrders) => [...prevOrders, order]);
      sendPushNotification(order);
    });

    // Log socket connection status
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off("incomingOrder");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [restaurantId, setOrders, sendPushNotification]);
};
