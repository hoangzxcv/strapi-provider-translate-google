# Strapi Provider Translate Google

[![Release Version](https://img.shields.io/github/v/release/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google/releases)
[![Last Commit](https://img.shields.io/github/last-commit/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google/commits/main)
[![Issues](https://img.shields.io/github/issues/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google/pulls)
[![Forks](https://img.shields.io/github/forks/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google/network/members)
[![Stars](https://img.shields.io/github/stars/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google/stargazers)
[![License](https://img.shields.io/github/license/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google/blob/main/LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google)
[![Code Size](https://img.shields.io/github/languages/code-size/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google)
[![Repository Size](https://img.shields.io/github/repo-size/cabrera-evil/strapi-provider-translate-google)](https://github.com/cabrera-evil/strapi-provider-translate-google)
[![NPM Version](https://img.shields.io/npm/v/strapi-provider-translate-google)](https://www.npmjs.com/package/strapi-provider-translate-google)
[![NPM Downloads](https://img.shields.io/npm/dt/strapi-provider-translate-google)](https://www.npmjs.com/package/strapi-provider-translate-google)

Welcome to the Strapi Provider Translate Google repository!

## Table of Contents

- [Strapi Provider Translate Google](#strapi-provider-translate-google)
  - [Table of Contents](#table-of-contents)
  - [Installing](#installing)
  - [Usage](#usage)
  - [License](#license)

## Installing

Using npm:

```bash
$ npm install strapi-provider-translate-google
```

Using yarn:

```bash
$ yarn add strapi-provider-translate-google
```

Using pnpm:

```bash
$ pnpm add strapi-provider-translate-google
```

## Usage

Configure the provider through the pluginOptions:

```js
module.exports = {
  // ...
  translate: {
    enabled: true,
    config: {
      // Choose google as the provider
      provider: "google",
      // Pass credentials and other options to the provider
      providerOptions: {
        // Your API key - required and wil cause errors if not provided
        apiKey: "key",
        // Your project id - required and wil cause errors if not provided
        projectId: "project-id",
        // Use custom locale mapping (for example to translate from your default locale to en-US)
        localeMap: {
          // Use uppercase here!
          EN: "EN-US",
        },
      },
      // Other options ...
    },
  },
  // ...
};
```

or use the default environment variables:

- `GOOGLE_API_KEY` - default `undefined`
- `GOOGLE_PROJECT_ID` - default `undefined`

To get the API key and project id, follow the instructions in the [Google Cloud Translation API documentation](https://cloud.google.com/translate/docs/setup).

## License

This repository is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the scripts as long as you include the original license text.

---
