
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import HomeImg from "@/assets/images/home.png";
import { Button } from "react-native-paper";
import packageJson from "../package.json"; 

const GetStartedScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.navigate("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={HomeImg} 
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

      <Text style={styles.text}>
        Version: {packageJson.version}</Text>
      

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
    paddingHorizontal:40,
    borderRadius: 8,
  },
  text:{
    fontSize: 14,
    color: "gray",
    marginTop: 10,
    textAlign:'center'
  },
});
