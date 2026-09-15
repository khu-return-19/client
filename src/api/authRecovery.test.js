import {
  AUTH_EXPIRED_EVENT,
  clearClientAuthState,
  dispatchAuthExpired,
  isProtectedApiUrl,
} from "./authRecovery";

describe("auth recovery", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("clears only client auth hints and preserves resume/input data", () => {
    sessionStorage.setItem("verifiedEmail", "member@khu.ac.kr");
    sessionStorage.setItem("sessionStartTime", "123");
    sessionStorage.setItem("agreementChecked", "true");
    sessionStorage.setItem("company_companyName", "Example");
    sessionStorage.setItem("selfIntroCards", "[]");

    clearClientAuthState();

    expect(sessionStorage.getItem("verifiedEmail")).toBeNull();
    expect(sessionStorage.getItem("sessionStartTime")).toBeNull();
    expect(sessionStorage.getItem("agreementChecked")).toBeNull();
    expect(sessionStorage.getItem("company_companyName")).toBe("Example");
    expect(sessionStorage.getItem("selfIntroCards")).toBe("[]");
  });

  it("dispatches one browser event after clearing auth hints", () => {
    sessionStorage.setItem("verifiedEmail", "member@khu.ac.kr");
    const listener = jest.fn();
    window.addEventListener(AUTH_EXPIRED_EVENT, listener);

    dispatchAuthExpired();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem("verifiedEmail")).toBeNull();
    window.removeEventListener(AUTH_EXPIRED_EVENT, listener);
  });

  it("recognizes only protected API paths for global 401 recovery", () => {
    expect(isProtectedApiUrl("/api/analysis")).toBe(true);
    expect(isProtectedApiUrl("/api/parse/convert")).toBe(true);
    expect(isProtectedApiUrl("/api/auth/email/credit")).toBe(true);
    expect(isProtectedApiUrl("/api/sessions/extend")).toBe(true);
    expect(isProtectedApiUrl("/api/sessions/logout")).toBe(true);
    expect(isProtectedApiUrl("/api/auth/email/verify")).toBe(false);
    expect(isProtectedApiUrl("/api/sessions/start")).toBe(false);
    expect(isProtectedApiUrl("/api/auth/email/verification")).toBe(false);
  });
});
