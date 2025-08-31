import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import Login from "@screens/Login";
import Menu from "@screens/Menu";
import PetDetails from "@screens/PetDetails";
import VaccineHistory from "@screens/VaccineHistory";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />

      <Screen name="Home" component={Home} />

      <Screen name="PetDetails" component={PetDetails} />

      <Screen name="VaccineHistory" component={VaccineHistory} />

      <Screen name="Menu" component={Menu} />
    </Navigator>
  );
}
