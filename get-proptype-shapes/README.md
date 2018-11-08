# Gather statics on your React PropType root identifiers

Gathers statistics on all `PropType.shape({}) child identifiers.  

**Playground**: Open your console to see some statistics

> https://astexplorer.net/#/gist/f20fe14331a63e1f4d7c8141fa2f5e09/bdd3c1131bd639a3c72446de91896372a9ca57cd

## Gather statistics on project:
```sh
  $ jscodeshift -t ./get-proptype-shapes/index.js ~/Developer/myProject --dry --parser babylon --ignore-pattern="__tests__/*"
```

## Example

```javascript
  class MyComponent extends Component {
    static propTypes = {
      propA: PropTypes.any,
      propB: PropTypes.shape({
        childA: PropTypes.string
      }),
      propC: PropTypes.shape({
        childA: PropTypes.string 
      })
    };
  }

  MyComponent.propTypes = {
    propB: PropTypes.shape({
        childA: PropTypes.string,
        childB: PropTypes.bool
    }),
    propC: PropTypes.number
  };
```

## Output

Console output of hash mapped to JSON:

```javascript
{
  463011842: {childA: "PropTypes.string"}
  463011842: {childA: "PropTypes.string"}
  -1218964432: {childA: "PropTypes.string", childB: "PropTypes.bool"}
}
```

Stats output of hash occurrences:

```json
{
  "463011842": 2,
  "-1218964432": 1
}
```