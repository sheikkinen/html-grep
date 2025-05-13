#!/usr/bin/env node

/**
 * html-grep.mjs - A tool to extract HTML elements with specified IDs from HTML documents
 * 
 * Created based on prompts:
 * - "simple design for html-grep.mjs. md in docs folder. tool extracts html element with given id"
 * - "implement html-grep"
 * 
 * Background:
 * - Implemented using Claude 3.7 as an AI assistant
 * - Extracts HTML elements by ID from local files or remote URLs
 * - Designed for simplicity and ease of use
 * - Created on May 13, 2025
 * 
 * License: MIT
 */

import fs from 'fs';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import minimist from 'minimist';

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = minimist(process.argv.slice(2));
  
  // Validate required arguments
  if (!args.id) {
    console.error('Error: --id argument is required.');
    printUsage();
    process.exit(1);
  }

  // Validate input source
  if (!args.file && !args.url) {
    console.error('Error: Either --file or --url argument is required.');
    printUsage();
    process.exit(1);
  }

  if (args.file && args.url) {
    console.error('Error: Please specify either --file or --url, not both.');
    printUsage();
    process.exit(1);
  }

  return args;
}

/**
 * Print usage information
 */
function printUsage() {
  console.log(`
Usage:
  node html-grep.mjs --id=targetElementId [--file=input.html | --url=https://example.com] [--output=output.html]

Options:
  --id       ID of the HTML element to extract (required)
  --file     Path to a local HTML file (optional)
  --url      URL of a webpage to fetch (optional)
  --output   Path to save the output (optional, defaults to stdout)

Examples:
  node html-grep.mjs --id=content --file=webpage.html
  node html-grep.mjs --id=main --url=https://example.com
  node html-grep.mjs --id=header --file=index.html --output=header.html
`);
}

/**
 * Load HTML content from file or URL
 */
async function loadHtmlContent(args) {
  try {
    if (args.file) {
      return fs.readFileSync(args.file, 'utf8');
    } else if (args.url) {
      const response = await fetch(args.url);
      return await response.text();
    }
  } catch (error) {
    console.error(`Error loading HTML content: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Extract element by ID from HTML content
 */
function extractElementById(htmlContent, id) {
  try {
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    const element = document.getElementById(id);
    
    if (!element) {
      console.error(`Error: Element with ID "${id}" not found.`);
      process.exit(1);
    }
    
    return element.outerHTML;
  } catch (error) {
    console.error(`Error parsing HTML or extracting element: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Output the extracted HTML
 */
function outputResult(extractedHtml, outputPath) {
  if (outputPath) {
    try {
      fs.writeFileSync(outputPath, extractedHtml);
      console.log(`Output saved to ${outputPath}`);
    } catch (error) {
      console.error(`Error writing to output file: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.log(extractedHtml);
  }
}

/**
 * Main function
 */
async function main() {
  const args = parseArgs();
  const htmlContent = await loadHtmlContent(args);
  const extractedElement = extractElementById(htmlContent, args.id);
  outputResult(extractedElement, args.output);
}

// Execute the main function
main().catch(error => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});