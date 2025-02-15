import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useDispatch } from "../store/types";
import { loadTokenFromAsyncStorage } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";

import LoginScreen from "@/screens/Auth/LoginScreen";
import SignupScreen from "@/screens/Auth/SignupScreen";
import HomeScreen from "../app/screens/HomeScreen";
import OrderScreen from "../app/screens/Order";
import SettingsScreen from "../app/screens/SettingsScreen";
import MenuManagement from "../app/screens/MenuManagement";
import RestaurantDetail from "@/screens/RestaurantDetailScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { Order } from "../types/Orders";
import * as Notifications from "expo-notifications";

// Import your custom FFBottomTab
import FFBottomTab from "../components/FFBottomTab";
import PromotionManagement from "../app/screens/PromotionList";
import CustomerFeedback from "../app/screens/CustomerFeedback";
import useSearchNearbyDrivers from "../hooks/useSearchNearbyDrivers";
import { useSocket } from "../hooks/useSocket";
import { Type_PushNotification_Order } from "../types/pushNotification";
import FFToast from "../components/FFToast";
import FFText from "../components/FFText";
import Spinner from "../components/FFSpinner";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { sendPushNotification } from "../utils/functions/pushNotification";

// Define the param lists for the navigators
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

export type MainStackParamList = {
  BottomTabs: undefined;
  Promotions: undefined;
  CustomerFeedback: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Orders: undefined;
  MenuManagement: undefined;
  Settings: undefined;
};

// Create the navigators
const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

type BottomNavigationProp = BottomTabNavigationProp<BottomTabParamList>;

// BottomTabs component with FFBottomTab
const BottomTabs = () => {
  const [currentScreen, setCurrentScreen] = useState(0); // Track the current tab index

  // Use useNavigation with the correct type for BottomTab navigation
  const navigation = useNavigation<BottomNavigationProp>();

  const renderedScreen = () => {
    switch (currentScreen) {
      case 0:
        return <HomeScreen />;
      case 1:
        return <OrderScreen />;
      case 2:
        return <MenuManagement />;
      case 3:
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <>
      {renderedScreen()}
      <FFBottomTab
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    </>
  );
};

// MainStack component
const MainStackScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 10.826411,
    lng: 106.617353,
  });
  const { restaurant_id } = useSelector((state: RootState) => state.auth);
  const { expoPushToken } = usePushNotifications();

  // const { nearbyDrivers, allDrivers } = useSearchNearbyDrivers({
  //   selectedLocation,
  //   tomtomKey: "7zmNwV5XQGs5II7Z7KxIp9K551ZlFAwV",
  //   isCaptureDriverOnlyThisMoment: true,
  // });
  // console.log(nearbyDrivers, allDrivers);

  const [orders, setOrders] = useState<Type_PushNotification_Order[]>([]);
  const [isShowIncomingOrderToast, setIsShowIncomingOrderToast] =
    useState(false);
  useEffect(() => {
    if (orders.length > 0) {
      setIsShowIncomingOrderToast(true);
      let pushToken = expoPushToken as unknown as { data: string };
      sendPushNotification({
        order: orders[orders.length - 1],
        expoPushToken: pushToken,
      });
    }
  }, [orders]);
  let pushToken = expoPushToken as unknown as { data: string };
  useSocket(restaurant_id || "", setOrders, () =>
    sendPushNotification({
      order: orders[orders.length - 1],
      expoPushToken: pushToken,
    })
  );
  // const { nearbyDrivers } = useSearchNearbyDrivers({
  //   selectedLocation,
  //   tomtomKey: "e73LfeJGmk0feDJtiyifoYWpPANPJLhT",
  //   isCaptureDriverOnlyThisMoment: true,
  // });
  // console.log("cejck new by", nearbyDrivers);

  return (
    <>
      <MainStack.Navigator>
        <MainStack.Screen
          options={{ headerShown: false }}
          name="BottomTabs"
          component={BottomTabs}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Promotions"
          component={PromotionManagement}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="CustomerFeedback"
          component={CustomerFeedback}
        />
      </MainStack.Navigator>
      {/* FFToast logic is commented for now */}
      <FFToast
        disabledClose
        onClose={() => setIsShowIncomingOrderToast(false)}
        visible={isShowIncomingOrderToast}
        isApproveToast
      >
        <FFText>New Order</FFText>
      </FFToast>
    </>
  );
};

// AuthStack component
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={LoginScreen}
    />
    <AuthStack.Screen
      options={{ headerShown: false }}
      name="Signup"
      component={SignupScreen}
    />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={token ? "Main" : "Auth"}
        options={{ headerShown: false }}
        component={token ? MainStackScreen : AuthStackScreen}
      />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
