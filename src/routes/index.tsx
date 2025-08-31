import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { AuthRoutes } from "./auth.routes";
import CPLoading from "@components/CPLoading";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    return <CPLoading isLoading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFD8C4" }}>
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
