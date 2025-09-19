import { describe, expect, it } from "vitest";

import { handler } from "./index";

describe("example handler", () => {
  it("should return hello world response", async () => {
    const result = await handler();

    expect(result).toEqual({
      body: "Hello World",
      statusCode: 200,
    });
  });
});
