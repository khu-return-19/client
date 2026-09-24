import { createAnalysis } from "./analysisApi";
import { AUTH_EXPIRED_EVENT } from "./authRecovery";
import { TextDecoder as NodeTextDecoder } from "util";

describe("createAnalysis authentication contract", () => {
  beforeEach(() => {
    global.TextDecoder = NodeTextDecoder;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("sends the HttpOnly session cookie with the streaming request", async () => {
    const reader = {
      read: jest.fn().mockResolvedValue({ done: true, value: undefined }),
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      body: { getReader: () => reader },
    }) as jest.Mock;

    await createAnalysis({} as any, jest.fn());

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/analysis",
      expect.objectContaining({
        credentials: "include",
        headers: expect.objectContaining({ "X-API-Version": "2" }),
      }),
    );
  });

  it("turns a protected streaming 401 into auth recovery without a reload", async () => {
    const onExpired = jest.fn();
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 401 }) as jest.Mock;

    await expect(createAnalysis({} as any, jest.fn())).rejects.toMatchObject({
      status: 401,
    });

    expect(onExpired).toHaveBeenCalledTimes(1);
    window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);
  });
});
