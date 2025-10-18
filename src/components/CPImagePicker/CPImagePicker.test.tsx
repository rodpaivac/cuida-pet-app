import { render } from "@testing-library/react-native";
import CPImagePicker from ".";

describe("Component: CPImagePicker", () => {
  it("should match snapshot", () => {
    const tree = render(
      <CPImagePicker imageUri="" onSelect={() => {}} type="user" />
    );
    expect(tree).toMatchSnapshot();
  });
});
