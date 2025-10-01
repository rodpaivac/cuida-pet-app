import { ageCalc } from "./age";

describe("Age calc", () => {
  const mockToday = new Date("2025-09-30");

  beforeAll(() => {
    jest.useFakeTimers(); // coloca o Jest em modo "fake clock"
    jest.setSystemTime(mockToday); // define a data atual para 30/09/2025
  });

  afterAll(() => {
    jest.useRealTimers(); // restaura o comportamento real do relógio
  });

  it("should return the correct age when the year's birthday has already passed", () => {
    const birthdate = new Date("2022-06-01");
    const age = ageCalc(birthdate);
    expect(age).toBe(3);
  });

  it("should return the correct age when the year's birthday has not already passed", () => {
    const birthdate = new Date("2022-11-01");
    const age = ageCalc(birthdate);
    expect(age).toBe(2);
  });

  it("should return 0 when they have been born this year", () => {
    const birthdate = new Date("2025-01-01");
    const age = ageCalc(birthdate);
    expect(age).toBe(0);
  });
});
