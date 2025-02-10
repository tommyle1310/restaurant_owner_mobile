import React, { useState, useEffect } from "react";
import { TextInput, Switch, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FFInputControl from "@/src/components/FFInputControl";
import FFToggle from "@/src/components/FFToggle";
import FFButton from "@/src/components/FFButton";
import FFText from "@/src/components/FFText";
import FFView from "@/src/components/FFView";
import FFDropdown from "@/src/components/FFDropdown";

interface MenuItem {
  _id?: string;
  restaurant_id: string;
  name: string;
  description?: string;
  category: string[];
  availability: boolean;
  suggest_notes: string[];
  variants: string[];
  purchase_count: number;
  discount?: {
    discount_type: "FIXED" | "PERCENTAGE";
    discount_value: number;
    start_date: number;
    end_date: number;
  } | null;
}

const MenuManagement = () => {
  const [menuItem, setMenuItem] = useState<MenuItem>({
    restaurant_id: "",
    name: "",
    description: "",
    category: [],
    availability: false,
    suggest_notes: [],
    variants: [],
    purchase_count: 0,
    discount: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setMenuItem({
        _id: "12345",
        restaurant_id: "rest_001",
        name: "Spicy Ramen",
        description: "A delicious spicy ramen with pork and egg",
        category: ["Asian", "Noodles"],
        availability: true,
        suggest_notes: ["Less spicy", "Extra noodles"],
        variants: ["Large", "Medium"],
        purchase_count: 40,
        discount: {
          discount_type: "PERCENTAGE",
          discount_value: 10,
          start_date: 1712438400,
          end_date: 1715030400,
        },
      });
    }, 1000);
  }, []);

  return (
    <FFView style={{ padding: 20, flex: 1 }}>
      <FFText fontSize="2xl">Menu Management</FFText>
      <FFInputControl
        error={""}
        label="Item Name"
        placeholder="Sushu Reamen"
        setValue={() => {}}
        value=""
      />

      <FFView
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <FFText>Availability:</FFText>
        <FFToggle />
      </FFView>

      <FFDropdown
      label="Select Variant"
        onSelect={() => {}}
        options={["Small", "Medium", "Large"]}
        placeholder=""
        selectedOption=""
      />
      <FFButton variant="danger" className="w-full my-4">Confirm</FFButton>
    </FFView>
  );
};

export default MenuManagement;
