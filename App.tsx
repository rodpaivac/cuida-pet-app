import React from "react";

import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
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
import { AuthContextProvider } from "@contexts/AuthContext";
import { PetContextProvider } from "@contexts/PetContext";
import { VaccineContextProvider } from "@contexts/VaccineContext";

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
        <AuthContextProvider>
          <PetContextProvider>
            <VaccineContextProvider>
              {fontsLoaded ? <Routes /> : <CPLoading isLoading />}
            </VaccineContextProvider>
          </PetContextProvider>
        </AuthContextProvider>
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
