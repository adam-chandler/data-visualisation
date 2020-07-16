const { counter } = require("./counter");

describe.only("counter", () => {
  it("Empty array returns array of 0's", () => {
    expect(counter([])).toEqual([0, 0, 0, 0, 0, 0]);
  });
  it("A single person is identified by age", () => {
    expect(counter([{ age: "over 34" }])).toEqual([0, 0, 0, 0, 0, 1]);
    expect(counter([{ age: null }])).toEqual([1, 0, 0, 0, 0, 0]);
    expect(counter([{ age: "18-24" }])).toEqual([0, 0, 0, 1, 0, 0]);
  });
  it("Returns correct array given multiple pieces of data", () => {
    expect(
      counter([
        { age: "18-24" },
        { age: "18-24" },
        { age: "18-24" },
        { age: null },
        { age: "under 10" },
        { age: "10-17" },
        { age: "18-24" },
        { age: "25-34" },
        { age: "over 34" },
        { age: null },
      ])
    ).toEqual([2, 1, 1, 4, 1, 1]);
  });
});
