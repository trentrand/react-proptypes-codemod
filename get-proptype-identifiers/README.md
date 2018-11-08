# Gather statics on your React PropType identifiers

Gathers statistics on all unique PropType identifiers and a count of their occurrences.

**Playground**: Open your console to see some statistics

> https://astexplorer.net/#/gist/0e9e7994da190383cdccd6b96c4b8729/b0d5b8a354a99a9113f2d3bbcf8d7a06cdcb8136

## Gather statistics on project:
```sh
  $ jscodeshift -t ./get-proptype-identifiers/index.js ~/Developer/myProject --dry --parser babylon --ignore-pattern="__tests__/*"
```

## Example

```javascript
  class MyComponent extends Component {
    static propTypes = {
      propA: PropTypes.any,
      propB: PropTypes.shape({
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

```json
{
  propA: 1,
  propB: 2,
  childA: 2,
  childB: 1,
  propC: 1
}
```