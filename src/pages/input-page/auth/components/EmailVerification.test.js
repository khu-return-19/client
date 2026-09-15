import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import EmailVerification from "./EmailVerification";

global.IS_REACT_ACT_ENVIRONMENT = true;

const mockSendVerifyEmail = jest.fn();
const mockVerifyEmailCode = jest.fn();

jest.mock("api/emailApi", () => ({
  getResponseStatus: (error) => error?.status ?? error?.response?.status,
  getRetryAfterSeconds: () => 0,
  useSendVerifyEmail: () => ({
    mutate: mockSendVerifyEmail,
    isPending: false,
  }),
  useVerifyEmailCode: () => ({
    mutate: mockVerifyEmailCode,
    isPending: false,
  }),
}));

jest.mock("./EmailSentModal", () => () => null);

function changeInput(input, value) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  ).set;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

describe("EmailVerification recovery", () => {
  let container;
  let root;

  beforeEach(() => {
    sessionStorage.clear();
    mockSendVerifyEmail.mockReset();
    mockVerifyEmailCode.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("reopens same-email verification after the parent invalidates the proof", () => {
    mockSendVerifyEmail.mockImplementation((_email, callbacks) => {
      callbacks.onSuccess();
    });
    mockVerifyEmailCode.mockImplementation((_data, callbacks) => {
      callbacks.onSuccess();
    });
    const onVerificationExpired = jest.fn();

    const render = (resetKey = 0) => {
      act(() => {
        root.render(
          <EmailVerification
            resetKey={resetKey}
            onEmailSent={() => {}}
            onEmailChanged={() => {}}
            onVerificationExpired={onVerificationExpired}
            onCodeVerified={() => {}}
          />,
        );
      });
    };

    render();
    act(() => {
      changeInput(container.querySelector('input[type="email"]'), "member@example.com");
    });
    act(() => container.querySelectorAll("button")[0].click());

    expect(container.querySelectorAll('input[type="text"]')).toHaveLength(1);
    act(() => {
      changeInput(container.querySelector('input[type="text"]'), "123456");
    });
    act(() => container.querySelectorAll("button")[1].click());

    expect(onVerificationExpired).not.toHaveBeenCalled();

    render(1);

    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput.value).toBe("member@example.com");
    expect(container.querySelectorAll('input[type="text"]')).toHaveLength(0);
    expect(container.querySelectorAll("button")[0].disabled).toBe(false);

    act(() => container.querySelectorAll("button")[0].click());
    expect(mockSendVerifyEmail).toHaveBeenCalledTimes(2);
  });
});
