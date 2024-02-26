module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	extends: ["airbnb-base", "prettier"],
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
	rules: {
		"no-console": "off",
		"import/extensions": ["error", "ignorePackages"],
		"no-underscore-dangle": "off",
	},
};
