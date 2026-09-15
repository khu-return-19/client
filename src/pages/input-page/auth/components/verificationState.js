export const EMAIL_CHALLENGE_DURATION_SECONDS = 10 * 60;

export const resetVerificationState = (currentState = {}) => ({
  ...currentState,
  isSent: false,
  showCodeSection: false,
  isVerified: false,
  code: "",
  codeError: false,
  codeRetryAfter: 0,
  timeLeft: EMAIL_CHALLENGE_DURATION_SECONDS,
});
