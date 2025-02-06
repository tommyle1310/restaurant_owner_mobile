import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "../store/types";
import { loadTokenFromAsyncStorage } from "../store/authSlice";


import LoginScreen from "@/screens/Auth/LoginScreen";
import SignupScreen from "@/screens/Auth/SignupScreen";
import { Order } from "../types/Orders";
import HomeScreen from "../app/screens/HomeScreen";
import OrderScreen from "../app/screens/Order";
import SettingsScreen from "../app/screens/Settings";
import MenuManagement from "../app/screens/MenuManagement";

// Root stack param list for Login, Signup, and Home
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

// Define HomeStackParamList clearly with the screen and params
export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: { restaurantId: string }; // Param for RestaurantDetail
  Checkout: { orderItem: Order }; // Add Checkout screen to stack
};

export type HomeTabsParamList = {
  Home:  undefined;
  Orders: undefined;
  MenuManagement: undefined;
  Setting: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      options={{ headerShown: false }}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name="Orders"
      component={OrderScreen}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name="MenuManagement"
      component={MenuManagement}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name="Setting"
      component={SettingsScreen}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      await dispatch(loadTokenFromAsyncStorage());
      setLoading(false);
    };
    loadToken();
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={token ? "Main" : "Login"}>
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        options={{ headerShown: false }}
        component={SignupScreen}
      />
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={HomeTabs}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
