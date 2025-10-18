import { render, screen } from "@testing-library/react-native";
import CPTextInput from ".";

describe("Component: CPTextInput", () => {
  it("should match snapshot", () => {
    // debugar renderização
    // const { debug } = render(
    //   <CPTextInput onChangeText={() => {}} value={""} label="oi" />
    // );
    // debug();

    const tree = render(
      <CPTextInput onChangeText={() => {}} value={""} label="nome" />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should render label when its prop is passed", () => {
    render(<CPTextInput onChangeText={() => {}} value={""} label="nome" />);
    const label = screen.getByTestId("label"); // quando usa get, ele retorna exceção quando não encontra o elemento com o parâmetro que passamos
    expect(label).toBeTruthy();
  });

  it("should not render label when its prop is not passed", () => {
    render(<CPTextInput onChangeText={() => {}} value={""} />);
    const label = screen.queryByTestId("label"); // o queryByTestId, quando não encontra o elemento, retorna nulo
    expect(label).toBeNull();
  });

  it("should render forgot password when its prop is passed", () => {
    render(
      <CPTextInput onChangeText={() => {}} value={""} showForgotPassword />
    );
    const forgotPassword = screen.getByTestId("forgot-password"); // quando usa get, ele retorna exceção quando não encontra o elemento com o parâmetro que passamos
    expect(forgotPassword).toBeTruthy();
  });

  it("should not render forgot password when its prop is not passed", () => {
    render(<CPTextInput onChangeText={() => {}} value={""} />);
    const forgotPassword = screen.queryByTestId("forgot-password"); // o queryByTestId, quando não encontra o elemento, retorna nulo
    expect(forgotPassword).toBeNull();
  });
});
