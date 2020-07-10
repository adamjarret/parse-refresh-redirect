const { parse: parseHTML } = require('parse5');

const pattern = /\d*;?\s*url=(.+)/i;
const headTagFinder = ({ tagName }) => tagName === 'head';
const contentAttrFinder = ({ name }) => name === 'content';
const refreshAttrFinder = ({ name, value }) =>
  name === 'http-equiv' && value === 'refresh';

// Parse HTML text and return a redirect URL if one is defined in the content attribute
//  of a <meta http-equiv="refresh"/> element.
function parseURL(text) {
  let url, contentAttr;

  // Parse HTML text
  const doc = parseHTML(text);

  // Get <html> node (see https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/index.md#parse)
  const html = doc.childNodes[1];

  // Get <head> node
  const head = !html ? null : html.childNodes.find(headTagFinder);

  // Do not process malformed HTML
  if (!head) {
    return;
  }

  // Iterate over <head> child nodes
  for (let i = 0; i < head.childNodes.length; i++) {
    const node = head.childNodes[i];
    // Ignore nodes that are not <meta http-equiv="refresh" content="..." />
    if (
      node.tagName === 'meta' &&
      node.attrs.find(refreshAttrFinder) &&
      (contentAttr = node.attrs.find(contentAttrFinder))
    ) {
      // Get the value of the content attribute
      const { value } = contentAttr;

      // Match the value against pattern
      const matches = value ? value.match(pattern) : undefined;

      // If the value matches, use the first match group as the url
      url = matches ? matches[1] : undefined;

      // Stop iterating after the first <meta http-equiv="refresh" content="..." />
      //  element is encountered
      break;
    }
  }

  return url;
}

module.exports = parseURL;
