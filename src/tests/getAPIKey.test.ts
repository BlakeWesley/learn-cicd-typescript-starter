import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test.each([
    [{}, null],
    [{ authorization: undefined }, null],
    [{ authorization: "" }, null],
    [{ authorization: "Bearer abc123" }, null],
    [{ authorization: "ApiKey" }, null],
    [{ authorization: "apikey abc123" }, null],
    [{ authorization: "APIKEY abc123" }, null],
    [{ authorization: "ApiKey abc123" }, "abc123"],
    [{ authorization: "ApiKey sk_test_123-abc" }, "sk_test_123-abc"],
    [{ authorization: "ApiKey abc123 extra" }, "abc123"],
  ])("returns %p -> %p", (headers, expected) => {
    expect(getAPIKey(headers)).toBe(expected);
  });
});
