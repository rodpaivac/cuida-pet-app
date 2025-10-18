import { render } from "@testing-library/react-native";
import CPBadge from ".";

describe("Component: CPBadge", () => {
  it("should match snapshot", () => {
    const tree = render(<CPBadge text="teste" />);
    expect(tree).toMatchSnapshot();
  });
});
