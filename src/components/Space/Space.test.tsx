import { render } from "@testing-library/react-native";
import { SpaceH, SpaceV } from ".";

describe("Component: Space", () => {
  it("should match snapshot: SpaceH", () => {
    const tree = render(<SpaceH />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot: SpaceV", () => {
    const tree = render(<SpaceV />);
    expect(tree).toMatchSnapshot();
  });
});
