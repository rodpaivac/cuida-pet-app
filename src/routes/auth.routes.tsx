import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "@screens/ForgotPassword";
import Login from "@screens/Login";
import NewUser from "@screens/NewUser";
import UserDataConfirmation from "@screens/UserDataConfirmation";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="NewUser" component={NewUser} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="UserDataConfirmation" component={UserDataConfirmation} />
    </Navigator>
  );
}
