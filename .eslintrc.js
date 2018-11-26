module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "ecmaVersion": 2018,
        },
        "sourceType": "module"
    },
    "plugins": [
        "react", 
        "jest"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "warn",
        "object-curly-spacing": ["warn", "always"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "no-console": 0,
        "react/prop-types": 0
    }
};