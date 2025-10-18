import { render } from "@testing-library/react-native";
import CPTextButton from ".";

describe("Component: CPTextButton", () => {
  it("should match snapshot", () => {
    const tree = render(<CPTextButton onPress={() => {}} title="teste" />);
    expect(tree).toMatchSnapshot();
  });
});
