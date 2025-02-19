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
      <Image source={HomeImg} style={styles.image} />
     <Text style={styles.text}>
      Home
     </Text>
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
    paddingHorizontal:25
  },
  image: {
    width: 200,
    height: 200,
    
  },
  text: {
   fontSize:30,
   marginBottom:80
  }



});
