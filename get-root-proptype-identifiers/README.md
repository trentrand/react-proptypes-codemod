# Gather statics on your React PropType root identifiers

Gathers statistics on all unique **root** PropType identifiers and a count of their occurrences.  
<u>This version excludes child PropType identifiers (e.g. `logMe: PropTypes.Shape({ butNotMe: PropTypes.any }))`)</u>

**Playground**: Open your console to see some statistics

> https://astexplorer.net/#/gist/4096621e7d95ad4269e5cd29e6135eb7/df70cc7cdcf0f863c441a134597cf2753360177f

## Gather statistics on project:
```sh
  $ jscodeshift -t ./get-root-proptype-identifiers/index.js ~/Developer/myProject --dry --parser babylon --ignore-pattern="__tests__/*"
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
  propC: 1
}
```