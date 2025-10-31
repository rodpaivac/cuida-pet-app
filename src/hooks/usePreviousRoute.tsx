import { useNavigation } from "@react-navigation/native";

export function usePreviousRoute() {
  const navigation = useNavigation();

  const navigationState = navigation.getState();
  const routes = navigationState?.routes;
  const currentIndex = navigationState?.index;
  const previousRoute =
    routes && currentIndex ? routes[currentIndex - 1] : null;
  return previousRoute?.name;
}
