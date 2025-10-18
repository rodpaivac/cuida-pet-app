import { render } from "@testing-library/react-native";
import CPContextualLoading from ".";

describe("Component: CPContextualLoading", () => {
  it("should match snapshot", () => {
    const tree = render(
      <CPContextualLoading textLines={["teste1", "teste2"]} />
    );
    expect(tree).toMatchSnapshot();
  });
});
