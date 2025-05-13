# html-grep.mjs

## Overview
`html-grep.mjs` is a simple JavaScript tool that extracts HTML elements with specified IDs from HTML documents. It provides an easy way to find and extract specific elements from web pages for further processing or analysis.

## Features
- Extract HTML elements by their ID attribute
- Support for both local HTML files and remote URLs
- Clean output of just the matched element and its children
- Easy to use command-line interface

## Usage
```bash
node html-grep.mjs --id=targetElementId [--file=input.html | --url=https://example.com]
```

## Design

### Core Components
1. **Input Handler**
   - Processes command-line arguments
   - Reads HTML content from local files or fetches from URLs

2. **HTML Parser**
   - Uses a lightweight HTML parsing approach (DOM parser or regex-based)
   - Locates elements by ID efficiently

3. **Output Formatter**
   - Extracts the matched element and its contents
   - Formats output as clean HTML

### Implementation Details

#### Command-line Arguments
The tool will accept the following arguments:
- `--id`: The ID of the HTML element to extract (required)
- `--file`: Path to a local HTML file (optional)
- `--url`: URL of a webpage to fetch (optional)
- `--output`: Path to save the output (optional, defaults to stdout)

#### Algorithm
1. Parse command-line arguments
2. Load HTML content from file or URL
3. Parse HTML content
4. Find element with the specified ID
5. Extract the element and its children
6. Output the results

#### Error Handling
- Handle missing or invalid arguments
- Handle file reading/URL fetching errors
- Handle cases where the element ID is not found

## Example
```bash
# Extract a div with ID "content" from a local file
node html-grep.mjs --id=content --file=webpage.html

# Extract a div with ID "main" from a URL
node html-grep.mjs --id=main --url=https://example.com
```

## Dependencies
- Node.js standard libraries
- An HTML parsing library (optional)

## Future Enhancements
- Support for CSS selectors beyond just ID selection
- Support for extracting multiple elements in one pass
- Output formatting options (JSON, text-only, etc.)