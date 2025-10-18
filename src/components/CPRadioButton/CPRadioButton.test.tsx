import { render } from "@testing-library/react-native";
import CPRadioButton from ".";

describe("Component: CPRadioButton", () => {
  it("should match snapshot", () => {
    const tree = render(<CPRadioButton />);
    expect(tree).toMatchSnapshot();
  });
});
