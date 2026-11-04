import posthog from "posthog-js";

const posthogKey = process.env.REACT_APP_POSTHOG_KEY;
const posthogHost = process.env.REACT_APP_POSTHOG_HOST;

export const isPostHogEnabled = Boolean(posthogKey && posthogHost);

if (!posthogKey) {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      "REACT_APP_POSTHOG_KEY variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once REACT_APP_POSTHOG_KEY is configured"
    );
  }
} else if (!posthogHost) {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      "REACT_APP_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once REACT_APP_POSTHOG_HOST is configured"
    );
  }
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    logs: {
      serviceName: "khu-self-check-ai-web",
      environment: process.env.NODE_ENV,
    },
  });
}

export const posthogLogger = {
  info: (message, attributes) => {
    if (isPostHogEnabled) {
      posthog.logger.info(message, attributes);
    }
  },
  warn: (message, attributes) => {
    if (isPostHogEnabled) {
      posthog.logger.warn(message, attributes);
    }
  },
};

export default posthog;
