import React, { useEffect } from "react";

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

import { NotificationClickEvent, OneSignal } from "react-native-onesignal";

OneSignal.initialize("aefe596e-097d-4c5e-9a20-4fb4e1685e33");
OneSignal.Notifications.requestPermission(true);

type AdditionalDataProps = {
  route?: string;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_400Regular,
  });

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      console.log("click", event);

      const { route } = event.notification
        .additionalData as AdditionalDataProps;

      if (route === "NextVaccines") {
        // navigation.navigate("NextVaccines");
      }
    };

    OneSignal.Notifications.addEventListener("click", handleNotificationClick);

    return () =>
      OneSignal.Notifications.removeEventListener(
        "click",
        handleNotificationClick
      );
  }, []);

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
