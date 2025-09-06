import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@screens/Login";
import NewUser from "@screens/NewUser";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="NewUser" component={NewUser} />
    </Navigator>
  );
}
