function getRootPropTypeIdentifiers(collection, j) {
  return collection
    .find(j.ObjectExpression)
    .at(0)
    .map(parentPath => {
      return j(parentPath)
        .find(j.Property, {
      		value: {
              type: "CallExpression"
      	
            }
      	})
    	.paths();
    })
}

function sortObject(obj) {
  return Object.keys(obj).sort().reduce((a, b) => (a[b] = obj[b], a), {});
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
    getRootPropTypeIdentifiers(collection, j)
  );
  
  proptypeIdentifiers.forEach(set => {
    set.forEach(parent => {
      	const propTypes = {};
      
        j(parent).find(j.Property).forEach(prop => {
          const key = prop.value.key.name;
          const type = `PropTypes.${prop.node.value.property.name}`;
          propTypes[key] = type;
        });
      
      	// Sort object by keys and stringify
      	const sortedPropTypes = sortObject(propTypes);
      	const propTypesString = JSON.stringify(sortedPropTypes);
      	const propTypesHash = propTypesString.hashCode();
      
      	// Print the `PropType.shape({})` identifiers and hash.
        // For readability, stats are gathered by hash. See the mapping here.
      	console.log(propTypesHash, propTypes);
      
      	// Hash the JSON and gather stats
      	api.stats(propTypesHash);
    });
  });
  
  return ast.toSource();
}

// Generate a hash code from string
// Source: https://stackoverflow.com/a/34842797/2020476
String.prototype.hashCode = function() {
	return this.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
};

module.exports = transformer;