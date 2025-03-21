import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FFButton from "@/src/components/FFButton";
import FFAvatar from "@/src/components/FFAvatar";
import FFModal from "@/src/components/FFModal";
import FFText from "@/src/components/FFText";
import FFInputControl from "@/src/components/FFInputControl";
import { logout } from "@/src/store/authSlice";
import { useDispatch } from "@/src/store/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/AppNavigator";

type SettingScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Main"
>;

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [restaurantName, setRestaurantName] = useState("My Restaurant");
  const [address, setAddress] = useState("123 Main Street");
  const [contact, setContact] = useState("0123456789");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isOpenmodal, setIsOpenModal] = useState(false);
  const navigation = useNavigation<SettingScreenNavigationProps>();
  const handleSelectAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access the media library."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleSelectAvatar}>
          {avatar ? (
            <FFAvatar avatar={avatar} onPress={handleSelectAvatar} />
          ) : (
            <FFAvatar onPress={handleSelectAvatar} />
          )}
        </TouchableOpacity>
      </View>
      <View className="gap-4 my-4">
        <FFInputControl
          error=""
          label="Restaurant Name"
          placeholder=""
          setValue={() => {}}
          value=""
        />
        <FFInputControl
          error=""
          label="Address"
          placeholder=""
          setValue={() => {}}
          value=""
        />
        <FFInputControl
          error=""
          label="Email"
          placeholder=""
          setValue={() => {}}
          value=""
        />
      </View>

      <FFButton
        className="mt-4 w-full "
        onPress={() => {
          setIsOpenModal(true);
        }}
      >
        Confirm
      </FFButton>

      <FFButton
        className="mt-4 w-full "
        onPress={() => {
          dispatch(logout());
          navigation.navigate("Auth");
        }}
      >
        logout
      </FFButton>

      <FFModal
        visible={isOpenmodal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      >
        <View className="flex-row justify-center">
          <FFAvatar rounded="sm" size={200} />
        </View>
      </FFModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#666",
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default SettingsScreen;
