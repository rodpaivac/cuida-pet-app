import {
  dateToString,
  isBeforeToday,
  isOneMonthFromToday,
  stringToDate,
} from "./date";

describe("Date", () => {
  const mockToday = new Date("2025-09-30");

  beforeAll(() => {
    jest.useFakeTimers(); // coloca o Jest em modo "fake clock"
    jest.setSystemTime(mockToday); // define a data atual para 30/09/2025
  });

  afterAll(() => {
    jest.useRealTimers(); // restaura o comportamento real do relógio
  });

  it("should return the proper string for the date", () => {
    const date = new Date("2022-06-01");
    const string = dateToString(date);
    expect(string).toBe("01/06/2022");
  });

  it("should return the proper date for the string", () => {
    const string = "01/06/2022";
    const date = stringToDate(string);
    expect(date).toEqual(new Date("2022-06-01")); // compara new Date() com .toEqual
  });

  it("should return true if the date is before today", () => {
    const date = new Date("2022-06-01");
    const isBefore = isBeforeToday(date);
    expect(isBefore).toBe(true);
  });

  it("should return false if the date is after today", () => {
    const date = new Date("2025-11-01");
    const isBefore = isBeforeToday(date);
    expect(isBefore).toBe(false);
  });

  it("should return true if the date is at most one month after today", () => {
    const date = new Date("2025-10-30");
    const isOneMonthFrom = isOneMonthFromToday(date);
    expect(isOneMonthFrom).toBe(true);
  });

  it("should return false if the date is not at most one month after today", () => {
    const date = new Date("2025-10-31");
    const isOneMonthFrom = isOneMonthFromToday(date);
    expect(isOneMonthFrom).toBe(false);
  });
});
