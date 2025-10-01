import { render } from "@testing-library/react-native";
import CPTextInput from ".";

describe("Component: CPTextInput", () => {
  it("", () => {
    const { debug } = render(
      <CPTextInput onChangeText={() => {}} value={""} />
    );
    debug();
  });
});
