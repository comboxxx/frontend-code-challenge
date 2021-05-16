import compareByNumber from "./compareByNumber";

describe("test compareNumber function", () => {
  // const numberList: number[] = [5, 3, 2, 1, 1, 8, 19];

  let lesserThanResult = compareByNumber("1", "2");
  let greaterThanResult = compareByNumber("2", "1");
  let equalResult = compareByNumber("1", "1");

  test("1 IS LESSER THAN 2", () => {
    expect(lesserThanResult).toEqual(-1);
  });

  test("2 IS GRAEATER THAN 1", () => {
    expect(greaterThanResult).toEqual(1);
  });

  test("1 IS EQUAL TO 1", () => {
    expect(equalResult).toEqual(0);
  });
});
