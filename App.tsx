import { StatusBar } from "react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "@screens/Login";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Routes } from "src/routes";
import {
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import CPLoading from "@components/CPLoading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_400Regular,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <CPLoading isLoading />}
      </>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
