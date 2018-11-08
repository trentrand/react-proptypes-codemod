# React PropType Codemods

This repository contains a collection of codemod scripts for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that help gather statistics on your React PropTypes.

## Setup & Run

1. `npm install --global jscodeshift`
2. `git clone https://github.com/trentrand/react-proptype-codemods.git`
3. Run `npm install` in the 'react-proptype-codemods' directory
4. `jscodeshift -t <codemod-script> <path> --dry --parser babylon --ignore-pattern="__tests__/*"
   * `codemod-script` - path to the codemod file, see available scripts below;
   * `path` - files or directory to process;
   * see all available [jscodeshift options](https://github.com/facebook/jscodeshift#usage-cli).

## Included Scripts

#### `get-proptype-identifiers`

Gathers statistics on all unique PropType identifiers and a count of their occurrences.  

**Playground**: Open your console to see some statistics  
https://astexplorer.net/#/gist/0e9e7994da190383cdccd6b96c4b8729/b0d5b8a354a99a9113f2d3bbcf8d7a06cdcb8136

#### `get-root-proptype-identifiers`

Gathers statistics on all unique **root** PropType identifiers and a count of their occurrences.  
<u>This version excludes child PropType identifiers (e.g. `logMe: PropTypes.Shape({ butNotMe: PropTypes.any }))`)</u>

**Playground**: Open your console to see some statistics  
https://astexplorer.net/#/gist/4096621e7d95ad4269e5cd29e6135eb7/df70cc7cdcf0f863c441a134597cf2753360177f

## React PropType AST Syntax

### PropTypes defined as <u>static class property</u> (es7) and <u>class property</u> (es6)

    ClassProperty | ExpressionStatement
      ObjectExpression
        Property