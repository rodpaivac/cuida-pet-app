import { render } from "@testing-library/react-native";
import CPHeader from ".";

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      name: "Menu", // ou qualquer rota que seu header espera
    }),
  };
});
describe("Component: CPHeader", () => {
  it("should match snapshot", () => {
    const tree = render(<CPHeader />);
    expect(tree).toMatchSnapshot();
  });
});
