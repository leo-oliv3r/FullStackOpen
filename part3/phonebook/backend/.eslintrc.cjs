module.exports = {
  env: {
    node: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["no-floating-promise", "promise"],
  rules: {
    "no-floating-promise/no-floating-promise": 2,
    "promise/catch-or-return": "error",
    "promise/always-return": "error",
  },
};
