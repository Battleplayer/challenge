module.exports = {
	parser: "babel-eslint",
	extends: ["airbnb", "prettier", "react-app"],
	env: {
		browser: true,
	},
	rules: {
		indent: [2, "tab", { SwitchCase: 1 }],
		"react/jsx-filename-extension": "off",
		"react/jsx-indent": ["error", 0],
		"react/jsx-indent-props": "off",
		"react/jsx-one-expression-per-line": "off",
		"jsx-quotes": [1, "prefer-double"],
		"react/prop-types": "off",
		"no-shadow": "off",
	},
};
