// screens/Login.tsx
import React, { useEffect, useState } from "react";
import FFSafeAreaView from "@/src/components/FFSafeAreaView";
import { useNavigation } from "@react-navigation/native";
import FFAuthForm from "./FFAuthForm";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  AuthStackParamList,
  RootStackParamList,
} from "@/src/navigation/AppNavigator"; // Make sure you have this path correct
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "@/src/store/types";
import {
  loadTokenFromAsyncStorage,
  saveTokenToAsyncStorage,
  setAuthState,
} from "@/src/store/authSlice";
import axiosInstance from "@/src/utils/axiosConfig";
import { RootState } from "@/src/store/store";
import { decodeJWT } from "@/src/utils/functions";
import {
  saveCartItemsToAsyncStorage,
  saveFavoriteRestaurantsToAsyncStorage,
} from "@/src/store/userPreferenceSlice";

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;
type RootNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const Login = () => {
  const authNavigation = useNavigation<LoginScreenNavigationProp>();
  const rootNavigation = useNavigation<RootNavigationProp>();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleLoginSubmit = async (email: string, password: string) => {
    // Request body
    const requestBody = {
      email: email,
      password: password,
    };

    try {
      // Make the POST request
      const response = await axiosInstance.post(
        "/auth/login-restaurant",
        requestBody,
        {
          // This will ensure axios does NOT reject on non-2xx status codes
          validateStatus: () => true, // Always return true so axios doesn't throw on errors
        }
      );

      // Now you can safely access the EC field
      const { EC, EM, data } = response.data; // Access EC, EM, and data

      if (EC === 0) {
        // Success, decode the JWT token (assuming 'data.access_token' contains the JWT)
        const userData = decodeJWT(data.access_token); // Decode JWT to get user data

        // Dispatch the action to save the user data to AsyncStorage and Redux store
        dispatch(
          saveTokenToAsyncStorage({
            accessToken: data.access_token, // Saving the actual access token
            app_preferences: userData.app_preferences || {}, // Fallback to empty object if not present
            email: userData.email || "", // Default to empty string if email is missing
            address: userData.address || [],
            restaurant_id: userData.restaurant_id || "",
            avatar: userData.address || { key: "", url: "" },
            contact_email: userData.contact_email || [],
            contact_phone: userData.contact_phone || [],
            images_gallery: userData.images_gallery || [],
            opening_hours: userData.opening_hours || {
              mon: {},
              tue: {},
              wed: {},
              thu: {},
              fri: {},
              sat: {},
              sun: {},
            },
            owner_id: userData.owner_id || "",
            promotions: userData.promotions || [],
            ratings: userData.ratings || {},
            restaurant_name: userData.restaurant_name || "",
            specialize_in: userData.specialize_in || [],
            status: userData.status || {},
            user_id: userData.user_id || "",
            user_type: userData.user_type || "RESTAURANT_OWNER",
          })
        );
        dispatch(
          saveFavoriteRestaurantsToAsyncStorage(userData.favorite_restaurants)
        );

        dispatch(saveCartItemsToAsyncStorage(userData.cart_items));

        rootNavigation.navigate("Main");
      } else {
        // Handle error based on EC (optional)
        setError(EM); // Show error message if EC is non-zero
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred during login."); // Provide a generic error message if the request fails
    }
  };

  return (
    <FFSafeAreaView>
      <LinearGradient
        colors={["#8fa3d9", "#b5b3a1", "#b5e1a1"]}
        start={[1, 0]}
        end={[0, 1]}
        className="flex-1 items-center justify-center"
      >
        <FFAuthForm
          error={error}
          isSignUp={false}
          onSubmit={handleLoginSubmit}
          navigation={authNavigation}
        />
      </LinearGradient>
    </FFSafeAreaView>
  );
};

export default Login;
