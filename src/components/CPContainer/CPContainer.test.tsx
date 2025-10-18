import { render } from "@testing-library/react-native";
import CPContainer from ".";

describe("Component: CPContainer", () => {
  it("should match snapshot", () => {
    const tree = render(<CPContainer />);
    expect(tree).toMatchSnapshot();
  });
});
