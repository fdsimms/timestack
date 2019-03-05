const scripts = require("./script.js");

test("basic test", () => {
  expect(2 + 3 + 6).toBe(15);
});
afterAll(() => {
  console.log("COMMENTE")
  scripts.comment("/test-output.json");
});
