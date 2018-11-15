function getStylesheetIdentifier(ast, j) {
  return ast
    .find(j.ImportDeclaration)
    .filter(path => {
      return path.value.source.value.endsWith(".less");
    })
    .nodes();
}

function transformer(file, api) {
  const j = api.jscodeshift;
  const ast = j(file.source);

  const stylesheetIdentifiers = getStylesheetIdentifier(ast, j);
  console.log(stylesheetIdentifiers);

  return ast.toSource();
}

module.exports = transformer;
