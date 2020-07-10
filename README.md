# parse-refresh-redirect

[![Package Version](https://badgen.net/npm/v/parse-refresh-redirect)](https://npmjs.com/package/parse-refresh-redirect)

Parse HTML with [parse5](https://www.npmjs.com/package/parse5) and return a redirect URL if one is defined in the `content` attribute of a `<meta http-equiv="refresh"/>` element.

## Features

- [API](#api) and [CLI](#cli)
- 100% unit test coverage
- TypeScript module definition

## Installation

    npm install parse-refresh-redirect

or

    yarn add parse-refresh-redirect

## Usage

### API

```js
const parseURL = require('parse-refresh-redirect');
```

#### `parseURL(html)`

Parse HTML string and return redirect URL string or `undefined`.

##### Examples

```js
const html = `
  <html>
    <head>
      <meta http-equiv="refresh" content="0; url=https://example.com/foo.html" />
    </head>
  </html>
`;

const url = parseURL(html);

// url === 'https://example.com/foo.html'
```

```js
const html = `
  <html>
    <head>
      <meta http-equiv="refresh" content="5" />
    </head>
  </html>
`;

const url = parseURL(html);

// url === undefined
```

```js
const html = `
  <html>
    <head>
      <title>Test</test>
    </head>
  </html>
`;

const url = parseURL(html);

// url === undefined
```

### CLI

The CLI will parse HTML input from `stdin` and output the redirect URL if found (it will output nothing if no URL was found).

    # HTML from local file
    cat index.html | parse-refresh-redirect

    # HTML from URL
    curl -s "https://adamjarret.github.io" | parse-refresh-redirect

If `parse-refresh-redirect` is not installed globally, run it with `npx` (ex. `cat index.html | npx parse-refresh-redirect`).

The exit code will be `0` if the URL was found, otherwise `1`.

The CLI takes no options.

## Author

[Adam Jarret](https://atj.me)
