#!/usr/bin/env node

const fs = require('fs');
const parseURL = require('.');

// Read content from stdin
const html = fs.readFileSync(0, 'utf-8');

// Parse URL
const url = parseURL(html);

// Exit with code 1 if URL was not found
if (!url) {
  process.exit(1);
}

// Output redirect URL
console.log(url);
process.exit(0);
