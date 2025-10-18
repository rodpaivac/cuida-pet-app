import { render } from "@testing-library/react-native";
import CPNotification from ".";
import { OSNotification } from "react-native-onesignal";

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
describe("Component: CPNotification", () => {
  it("should match snapshot", () => {
    const tree = render(
      <CPNotification data={{} as OSNotification} onClose={() => {}} />
    );
    expect(tree).toMatchSnapshot();
  });
});
