import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import FFSafeAreaView from "@/src/components/FFSafeAreaView";
import FFText from "@/src/components/FFText";
import FFView from "@/src/components/FFView";
import FFAvatar from "@/src/components/FFAvatar";
import PromotionManagement from "./PromotionList";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "@/src/navigation/AppNavigator";

type HomeNavigationProps = StackNavigationProp<
  MainStackParamList,
  "BottomTabs"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProps>();
  const [promotionTab, setPromotionTab] = useState<"current" | "expired">(
    "current"
  );

  // Function to return a greeting based on current hour.
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const restaurantName = "Restaurant ABC";

  return (
    <FFSafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* Header Section */}
      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FFAvatar size={50} />
        <View style={{ marginLeft: 12 }}>
          <FFText style={{ fontSize: 18, fontWeight: "bold" }}>
            {getGreeting()},
          </FFText>
          <FFText style={{ fontSize: 16 }}>{restaurantName}</FFText>
        </View>
      </View>

      {/* Promotions Section */}
      <View style={{ marginTop: 16, padding: 16, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FFText style={{ fontSize: 18, fontWeight: "bold" }}>
            Promotions
          </FFText>
          <TouchableOpacity onPress={() => navigation.navigate("Promotions")}>
            <Ionicons name="arrow-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {/* Promotion Tabs */}
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <TouchableOpacity
            onPress={() => setPromotionTab("current")}
            style={{ marginRight: 16 }}
          >
            <FFText
              style={{
                fontSize: 16,
                fontWeight: promotionTab === "current" ? "bold" : "normal",
                borderBottomWidth: promotionTab === "current" ? 2 : 0,
                borderBottomColor: "#000",
                paddingBottom: 4,
              }}
            >
              Current
            </FFText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPromotionTab("expired")}>
            <FFText
              style={{
                fontSize: 16,
                fontWeight: promotionTab === "expired" ? "bold" : "normal",
                borderBottomWidth: promotionTab === "expired" ? 2 : 0,
                borderBottomColor: "#000",
                paddingBottom: 4,
              }}
            >
              Expired
            </FFText>
          </TouchableOpacity>
        </View>
        {/* Promotion Content */}
        <View style={{ marginTop: 12 }}>
          {promotionTab === "current" ? (
            <FFText>List of current promotions goes here...</FFText>
          ) : (
            <FFText>List of expired promotions goes here...</FFText>
          )}
        </View>
      </View>

      {/* Customer Feedback Section */}
      <View style={{ marginTop: 16, padding: 16, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FFText style={{ fontSize: 18, fontWeight: "bold" }}>
            Customer Feedback
          </FFText>
          <TouchableOpacity
            onPress={() => navigation.navigate("CustomerFeedback")}
          >
            <Ionicons name="arrow-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 12 }}>
          {/* Feedback Item 1 */}
          <FFView
            style={{
              marginBottom: 8,
              padding: 8,
              backgroundColor: "#f9f9f9",
              borderRadius: 8,
            }}
          >
            <FFText style={{ fontWeight: "bold" }}>John Doe</FFText>
            <FFText>Great food and service!</FFText>
          </FFView>
          {/* Feedback Item 2 */}
          <FFView
            style={{
              marginBottom: 8,
              padding: 8,
              backgroundColor: "#f9f9f9",
              borderRadius: 8,
            }}
          >
            <FFText style={{ fontWeight: "bold" }}>Jane Smith</FFText>
            <FFText>The ambience was amazing!</FFText>
          </FFView>
          {/* Feedback Item 3 */}
          <FFView
            style={{ padding: 8, backgroundColor: "#f9f9f9", borderRadius: 8 }}
          >
            <FFText style={{ fontWeight: "bold" }}>Sam Wilson</FFText>
            <FFText>Food was delicious but a bit pricey.</FFText>
          </FFView>
        </View>
      </View>

      {/* Analytics Section */}
      <View
        style={{ marginTop: 16, padding: 16, backgroundColor: "#fff", flex: 1 }}
      >
        <FFText style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
          Analytics
        </FFText>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Daily Sales */}
          <View
          style={{
              width: "48%",
              backgroundColor: "#e6f7ff",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <FFText style={{ fontSize: 16, fontWeight: "bold" }}>
              Daily Sales
            </FFText>
            <FFText>$1,200</FFText>
          </View>
          {/* Revenue */}
          <View
            style={{
              width: "48%",
              backgroundColor: "#fff7e6",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <FFText style={{ fontSize: 16, fontWeight: "bold" }}>
              Revenue
            </FFText>
            <FFText>$15,000</FFText>
          </View>
          {/* Profit */}
          <View
            style={{
              width: "48%",
              backgroundColor: "#e6ffe6",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <FFText style={{ fontSize: 16, fontWeight: "bold" }}>Profit</FFText>
            <FFText>$3,500</FFText>
          </View>
          {/* Most Popular Item */}
          <View
            style={{
              width: "48%",
              backgroundColor: "#ffe6f7",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <FFText style={{ fontSize: 16, fontWeight: "bold" }}>
              Popular Item
            </FFText>
            <FFText>Cheeseburger</FFText>
          </View>
          {/* Add more analytics items as needed */}
        </View>
      </View>
    </FFSafeAreaView>
  );
};

export default HomeScreen;