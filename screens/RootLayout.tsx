// src/screens/RootLayout.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/src/store/types";
import { loadTokenFromAsyncStorage } from "@/src/store/authSlice";
import { RootState } from "@/src/store/store";
import { ThemeProvider } from "@/src/hooks/useTheme";
import AppNavigator from "@/src/navigation/AppNavigator";
import FFToast from "@/src/components/FFToast";
import FFText from "@/src/components/FFText";
import { usePushNotifications } from "@/src/hooks/usePushNotifications";
import { useSocket } from "@/src/hooks/useSocket";
import { Type_PushNotification_Order } from "@/src/types/pushNotification";
import { sendPushNotification } from "@/src/utils/functions/pushNotification";
import useSearchNearbyDrivers from "@/src/hooks/useSearchNearbyDrivers";

const RootLayout = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Type_PushNotification_Order[]>([]);
  const [isShowIncomingOrderToast, setIsShowIncomingOrderToast] =
    useState<boolean>(false);

  const { restaurant_id } = useSelector((state: RootState) => state.auth);

  // Loading token on component mount
  useEffect(() => {
    const loadToken = async () => {
      dispatch(loadTokenFromAsyncStorage());
    };

    loadToken();
  }, [dispatch]);

  // Using the socket hook to handle socket events and incoming orders
  useSocket(restaurant_id || "", setOrders, sendPushNotification);

  // Handle showing incoming order toast
  useEffect(() => {
    if (orders.length > 0) {
      setIsShowIncomingOrderToast(true);
      if (orders[orders.length - 1]) {
        sendPushNotification(orders[orders.length - 1]);
      }
    }
  }, [orders]);

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>({ lat: 10.826411, lng: 106.617353 });

  // Use the custom hook
  const { allDrivers, nearbyDrivers } = useSearchNearbyDrivers(
    selectedLocation,
    "7zmNwV5XQGs5II7Z7KxIp9K551ZlFAwV"
  );
  console.log("cehck newaby", allDrivers.length, nearbyDrivers.length);

  return (
    <ThemeProvider>
      <FFToast
        disabledClose
        onClose={() => setIsShowIncomingOrderToast(false)}
        visible={isShowIncomingOrderToast}
        isApproveToast
      >
        <FFText>New Order</FFText>
      </FFToast>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default RootLayout;
