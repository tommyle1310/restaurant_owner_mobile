import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store, { AppDispatch } from "@/src/store/store";
import { loadTokenFromAsyncStorage } from "@/src/store/authSlice";
import { ThemeProvider } from "@/src/hooks/useTheme";
import AppNavigator from "@/src/navigation/AppNavigator";
import FFSafeAreaView from "@/src/components/FFSafeAreaView";
import { useDispatch } from "@/src/store/types";
import socket from "@/src/services/socket";
import FFModal from "@/src/components/FFModal";
import FFText from "@/src/components/FFText";

interface Order {
  _id: string;
  customer_id: string;
  total_amount: number;
  status: string;
}

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadToken = async () => {
      dispatch(loadTokenFromAsyncStorage());
    };

    loadToken();
  }, [dispatch]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [isShowIncomingOrder, setIsShowIncomingOrder] =
    useState<boolean>(false);

  useEffect(() => {
    // Function to join the restaurant's room
    const joinRestaurantRoom = (restaurantId: string) => {
      socket.emit("joinRoom", restaurantId);
      console.log(`Joined room: ${restaurantId}`);
    };

    // Replace with the actual restaurant ID
    const restaurantId = "FF_RES_2a38c62b-29e2-4cbd-b75a-90c5596aab00";
    joinRestaurantRoom(restaurantId);

    // Listen for incoming orders
    socket.on("incomingOrder", (order: Order) => {
      console.log("Received incoming order:", order);
      setOrders((prevOrders) => [...prevOrders, order]);
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
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      setIsShowIncomingOrder(true);
    }
  }, [orders]);

  console.log("check listening order", orders);

  return (
    <ThemeProvider>
      <FFModal
        onClose={() => setIsShowIncomingOrder(false)}
        visible={isShowIncomingOrder}
      >
        <FFText>New Order</FFText>
      </FFModal>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default RootLayout;
