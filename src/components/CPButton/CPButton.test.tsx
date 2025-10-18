import { render } from "@testing-library/react-native";
import CPButton from ".";

describe("Component: CPButton", () => {
  it("should match snapshot", () => {
    const tree = render(<CPButton onPress={() => {}} title="teste" />);
    expect(tree).toMatchSnapshot();
  });
});
