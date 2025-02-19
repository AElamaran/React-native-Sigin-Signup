// GetStartedScreen.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import HomeImg from "@/assets/images/home.png";
import { Button } from "react-native-paper";

const GetStartedScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.navigate("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={HomeImg} // Replace with your image URL or local asset
        style={styles.image}
        resizeMode="contain"
      />
      <Button
        mode="contained"
        style={{ width: "100%" }}
        onPress={handleGetStarted}
      >
        Get Started
      </Button>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    // color: "#fff",
    // fontSize: 18,
    // fontWeight: "600",
  },
});
