import { render } from "@testing-library/react-native";
import CPPetCarousel from ".";

describe("Component: CPPetCarousel", () => {
  it("should match snapshot", () => {
    const tree = render(<CPPetCarousel pets={[]} selectPet={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});
