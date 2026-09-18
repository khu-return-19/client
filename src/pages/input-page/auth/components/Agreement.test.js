import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import Agreement from "./Agreement";

global.IS_REACT_ACT_ENVIRONMENT = true;

const mockStartSession = jest.fn();
const mockNavigate = jest.fn();

jest.mock("api/sessionApi", () => ({
  SESSION_STORAGE_KEY: "sessionStartTime",
  useStartSession: () => ({ mutate: mockStartSession, isPending: false }),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}), { virtual: true });

jest.mock("./TermsModal", () => () => null);

describe("Agreement proof recovery", () => {
  let container;
  let root;

  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem(
      "agreementChecked",
      JSON.stringify({
        terms: true,
        privacy: true,
        policy: true,
        thirdParty: true,
      }),
    );
    mockStartSession.mockReset();
    mockNavigate.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("keeps the expired-proof message until a new email attempt changes the key", () => {
    const onEmailInvalidated = jest.fn();
    const render = (emailChangeKey = 0, isEmailVerified = true) => {
      act(() => {
        root.render(
          <Agreement
            email="member@example.com"
            emailChangeKey={emailChangeKey}
            isEmailVerified={isEmailVerified}
            onEmailInvalidated={onEmailInvalidated}
          />,
        );
      });
    };

    mockStartSession.mockImplementation((_data, callbacks) => {
      callbacks.onError({ status: 401 });
    });

    render();
    act(() => container.querySelector("button").click());

    expect(onEmailInvalidated).toHaveBeenCalledTimes(1);
    expect(container.textContent).toContain(
      "이메일 인증이 만료되었습니다. 이메일을 다시 인증해 주세요.",
    );

    render(0, false);
    expect(container.textContent).toContain(
      "이메일 인증이 만료되었습니다. 이메일을 다시 인증해 주세요.",
    );

    render(1, false);
    expect(container.textContent).not.toContain(
      "이메일 인증이 만료되었습니다. 이메일을 다시 인증해 주세요.",
    );
  });
});
