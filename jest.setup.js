// jest.setup.js

// Mock do react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // Corrige alguns métodos que não estão no mock oficial
  Reanimated.default.call = () => {};

  return Reanimated;
});
