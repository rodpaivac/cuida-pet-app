import { render } from "@testing-library/react-native";
import CPPicker from ".";

describe("Component: CPPicker", () => {
  it("should match snapshot", () => {
    //TODO resolver
    const tree = render(<CPPicker items={[]} onSelect={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});
