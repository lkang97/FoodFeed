export const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://foodfeed-backend.herokuapp.com";

export const demo = {
  email: "demo@demo.com",
  password: "demouser",
};
