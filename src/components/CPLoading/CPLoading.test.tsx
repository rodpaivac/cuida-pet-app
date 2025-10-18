import { render } from "@testing-library/react-native";
import CPLoading from ".";

describe("Component: CPLoading", () => {
  it("should match snapshot", () => {
    const tree = render(<CPLoading isLoading />);
    expect(tree).toMatchSnapshot();
  });
});
