function getPropTypeIdentifiers(collection, j) {
  return collection
    .find(j.ObjectExpression)
    .at(0)
    .map(parentPath => {
      return j(parentPath)
        .find(j.Property)
    	  .paths();
    })
}

function transformer(file, api) {
  const j = api.jscodeshift;
  const ast = j(file.source);

  // PropTypes defined as a static class property (es7)
  // e.g. `static propTypes = { a: PropTypes.any }`
  const staticCollection = ast.find(j.ClassProperty, {
    key: {
      name: "propTypes"
    },
    value: {
      type: "ObjectExpression"
    },
    static: true
  });

  // PropTypes defined as a class property (es6)
  // e.g. `MyComponent.propTypes = { a: PropTypes.any }`
  const classCollection = ast.find(j.ExpressionStatement, {
    expression: {
      left: {
        property: {
          name: "propTypes"
        }
      },
      right: {
        type: "ObjectExpression"
      }
    }
  });

  const proptypeIdentifiers = [staticCollection, classCollection].map(collection =>
    getPropTypeIdentifiers(collection, j)
  );
  
  proptypeIdentifiers.forEach(set => {
    set.forEach(identifier => {
      api.stats(identifier.value.key.name);
    });
  });
  
  return ast.toSource();
}

module.exports = transformer;