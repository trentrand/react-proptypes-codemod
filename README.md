# React PropType Codemods

This repository contains a collection of codemod scripts for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that help gather statistics on your React PropTypes.

## React PropType AST Syntax

### PropTypes defined as <u>static class property</u> (es7) and <u>class property</u> (es6)

    ClassProperty | ExpressionStatement
      ObjectExpression
        Property