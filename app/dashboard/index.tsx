// GetStartedScreen.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import HomeImg from "@/assets/images/home.png";
import { Button } from "react-native-paper";

const HomeScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.navigate("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;

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
