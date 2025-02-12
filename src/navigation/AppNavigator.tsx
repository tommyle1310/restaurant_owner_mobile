import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
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

// Import your custom FFBottomTab
import FFBottomTab from "../components/FFBottomTab";
import PromotionManagement from "../app/screens/PromotionList";
import CustomerFeedback from "../app/screens/CustomerFeedback";

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
const MainStackScreen = () => (
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
);

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

// AppNavigator component
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
    return null; // Loading state, can show a loading spinner if needed
  }

  return (
    <RootStack.Navigator initialRouteName={token ? "Main" : "Auth"}>
      <RootStack.Screen
        name="Auth"
        options={{ headerShown: false }}
        component={AuthStackScreen}
      />
      <RootStack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={MainStackScreen}
      />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
