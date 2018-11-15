# Get Unused Styles

> https://astexplorer.net/#/gist/82900a4735cefc9ed89d60406317453c/08ba4bb3c42743fff6ca7229de873a9e81dffede

## Steps:

- Get each file's stylesheet ImportDeclaration
- Import stylesheet and make sure you can use its exports
- Try to resolve each use of all found stylesheet ImportDeclarationSpecifiers
    ```javascript
      const stylesheet from 'MyComponent.less';
      const { GRID, THICK } from 'layout.less';
    ```
- Log unresolved stylesheet uses
  e.g. `web/src/MyComponent/index.js (64:50) [stylesheet.missingClass]`
