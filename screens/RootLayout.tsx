import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store, { AppDispatch } from "@/src/store/store";
import { loadTokenFromAsyncStorage } from "@/src/store/authSlice";
import { ThemeProvider } from "@/src/hooks/useTheme";
import AppNavigator from "@/src/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import FFSafeAreaView from "@/src/components/FFSafeAreaView";
import { useDispatch } from "@/src/store/types";
import socket from "@/src/services/socket";
import FFModal from "@/src/components/FFModal";
import FFText from "@/src/components/FFText";
import { useNotifications } from "@/src/hooks/usePushNotifications";
import FFView from "@/src/components/FFView";

interface Order {
  _id: string;
  customer_id: string;
  total_amount: number;
  status: string;
}

const RootLayout = () => {
  const { expoPushToken, notifications } = useNotifications();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isShowIncomingOrder, setIsShowIncomingOrder] =
    useState<boolean>(false);

  useEffect(() => {
    const loadToken = async () => {
      dispatch(loadTokenFromAsyncStorage());
    };

    loadToken();
  }, [dispatch]);

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

  useEffect(() => {
    const getPushNotificationPermission = async () => {
      // Ask for permission to send push notifications (on iOS)
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        console.log("Notification permissions granted!");
      } else {
        console.log("Notification permissions denied.");
      }
    };

    getPushNotificationPermission();
  }, []);

  // Log when expoPushToken is available
  useEffect(() => {
    if (expoPushToken) {
      console.log("check push token:", expoPushToken?.data);
    }
  }, [expoPushToken]);

  // Log when notifications state is updated
  useEffect(() => {
    if (notifications) {
      const data = JSON.stringify(notifications, undefined, 2);
      console.log("check data:", data);
    }
  }, [notifications]);

  return (
    <ThemeProvider>
      <FFView>
        <FFText>{expoPushToken?.data ?? "No token yet"}</FFText>
        <FFText>
          {notifications ? JSON.stringify(notifications) : "No notifications"}
        </FFText>
      </FFView>
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
