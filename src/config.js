export const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEVELOPMENT_URL
    : process.env.REACT_APP_API_PRODUCTION_URL;

export const demo = {
  email: "demo@demo.com",
  password: "demouser",
};
