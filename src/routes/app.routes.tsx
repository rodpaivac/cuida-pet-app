import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Home";
import Menu from "@screens/Menu";
import NewPet from "@screens/NewPet";
import EditUser from "@screens/EditUser";
import PetDetails from "@screens/PetDetails";
import VaccineHistory from "@screens/VaccineHistory";
import NewVaccine from "@screens/NewVaccine";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />

      <Screen name="PetDetails" component={PetDetails} />

      <Screen name="VaccineHistory" component={VaccineHistory} />

      <Screen name="Menu" component={Menu} />

      <Screen name="NewPet" component={NewPet} />

      <Screen name="EditUser" component={EditUser} />

      <Screen name="NewVaccine" component={NewVaccine} />
    </Navigator>
  );
}
