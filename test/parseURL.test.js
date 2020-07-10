const fs = require('fs');
const path = require('path');
const { strictEqual } = require('assert');
const { PerformanceObserver, performance } = require('perf_hooks');
const parseURL = require('..');

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

const fixturesPath = path.join(__dirname, 'fixtures');

module.exports = ({ testSync, acEx }) => {
  testSync(
    'parseURL should return redirect URL if http-equiv="refresh" is present and has URL',
    () => {
      const fixturePath = path.join(fixturesPath, 'redirect.html');
      const html = fs.readFileSync(fixturePath, 'utf8');
      performance.mark('A');
      const actual = parseURL(html);
      performance.mark('B');
      performance.measure('parseURL', 'A', 'B');
      const expected = 'https://example.com/foo.html';
      strictEqual(actual, expected, acEx(actual, expected));
    }
  );

  testSync(
    'parseURL should return undefined if http-equiv="refresh" is present but has no URL',
    () => {
      const fixturePath = path.join(fixturesPath, 'refresh.html');
      const html = fs.readFileSync(fixturePath, 'utf8');
      performance.mark('A');
      const actual = parseURL(html);
      performance.mark('B');
      performance.measure('parseURL', 'A', 'B');
      const expected = undefined;
      strictEqual(actual, expected, acEx(actual, expected));
    }
  );

  testSync(
    'parseURL should return undefined if http-equiv="refresh" is not present',
    () => {
      const fixturePath = path.join(fixturesPath, 'no_redirect.html');
      const html = fs.readFileSync(fixturePath, 'utf8');
      performance.mark('A');
      const actual = parseURL(html);
      performance.mark('B');
      performance.measure('parseURL', 'A', 'B');
      const expected = undefined;
      strictEqual(actual, expected, acEx(actual, expected));
    }
  );

  testSync(
    'parseURL should return undefined for malformed HTML (no content)',
    () => {
      const fixturePath = path.join(fixturesPath, 'no_content.html');
      const html = fs.readFileSync(fixturePath, 'utf8');
      performance.mark('A');
      const actual = parseURL(html);
      performance.mark('B');
      performance.measure('parseURL', 'A', 'B');
      const expected = undefined;
      strictEqual(actual, expected, acEx(actual, expected));
    }
  );

  testSync(
    'parseURL should return undefined for malformed HTML (no value)',
    () => {
      const fixturePath = path.join(fixturesPath, 'no_value.html');
      const html = fs.readFileSync(fixturePath, 'utf8');
      performance.mark('A');
      const actual = parseURL(html);
      performance.mark('B');
      performance.measure('parseURL', 'A', 'B');
      const expected = undefined;
      strictEqual(actual, expected, acEx(actual, expected));
    }
  );

  testSync(
    'parseURL should return undefined for malformed HTML (no head)',
    () => {
      const fixturePath = path.join(fixturesPath, 'no_head.html');
      const html = fs.readFileSync(fixturePath, 'utf8');
      performance.mark('A');
      const actual = parseURL(html);
      performance.mark('B');
      performance.measure('parseURL', 'A', 'B');
      const expected = undefined;
      strictEqual(actual, expected, acEx(actual, expected));
    }
  );

  testSync(
    'parseURL should return undefined for malformed HTML (no html)',
    () => {
      const fixturePath = path.join(fixturesPath, 'no_html.html');
      const html = fs.readFileSync(fixturePath, 'utf8');
      performance.mark('A');
      const actual = parseURL(html);
      performance.mark('B');
      performance.measure('parseURL', 'A', 'B');
      const expected = undefined;
      strictEqual(actual, expected, acEx(actual, expected));
    }
  );
};
