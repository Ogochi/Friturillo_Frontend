module.exports = {
    "parser": "babel-eslint",
    "plugins": ["react"],
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
      "ecmaVersion": 7,
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
    "env": {
      "browser": true
    }
};