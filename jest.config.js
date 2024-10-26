// jest.config.js
module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest", // Use babel-jest to transform JS and TS files
    },
    transformIgnorePatterns: [
      "/node_modules/(?!your-esm-module)", // If you have ES modules in node_modules, specify them here
    ],
    testEnvironment: "node", // or "jsdom" if you are testing a browser environment
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  };
  