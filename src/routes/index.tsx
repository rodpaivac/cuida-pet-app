import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { AuthRoutes } from "./auth.routes";
import CPLoading from "@components/CPLoading";
import { useEffect, useState } from "react";
import {
  NotificationWillDisplayEvent,
  OneSignal,
  OSNotification,
} from "react-native-onesignal";
import CPNotification from "@components/CPNotification";

export function Routes() {
  const { token, isLoadingUserStorageData } = useAuth();

  const [notification, setNotification] = useState<OSNotification>();

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      event.preventDefault();
      const response = event.getNotification();
      setNotification(response);
    };

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      handleNotification
    );

    return () =>
      OneSignal.Notifications.removeEventListener(
        "foregroundWillDisplay",
        handleNotification
      );
  }, []);

  if (isLoadingUserStorageData) {
    return <CPLoading isLoading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFD8C4" }}>
      <NavigationContainer>
        {notification && (
          <CPNotification
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
        {token ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
