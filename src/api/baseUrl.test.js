describe("API origin", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  it("ignores a legacy external backend URL in production builds", () => {
    process.env = { ...originalEnv, NODE_ENV: "production", REACT_APP_BASE_URL: "https://old-api.example" };
    jest.isolateModules(() => {
      const api = require("./axiosInstance").default;
      expect(api.defaults.baseURL).toBe("");
      expect(api.defaults.withCredentials).toBe(true);
      expect(api.getUri({ url: "/api/sessions/start" })).toBe("/api/sessions/start");
    });
  });

  it("keeps the local development backend override", () => {
    process.env = { ...originalEnv, NODE_ENV: "development", REACT_APP_BASE_URL: "http://localhost:8080/" };
    jest.isolateModules(() => {
      expect(require("./baseUrl").API_BASE_URL).toBe("http://localhost:8080");
    });
  });
});
