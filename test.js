const scripts = require("./script.js");
try {
  test("basic test", () => {
    expect(2 + 3 + 6).toBe(12);
  });
} catch {
  scripts.comment('/test-output.json');  
  process.exit(1);
}
