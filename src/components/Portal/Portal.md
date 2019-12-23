## Description
The `Portal` element provides a way to create React portals dynamically. The component will create a new `DOM` node that attaches to the end of the `document.body` and render's the passed children within that DOM node.

## Example

```jsx
const styles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    border: '1px solid var(--BrandForest)',
    color: 'var(--BrandForest)',
    background: 'var(--BrandMoss)',
    borderRadius: '3px',
    padding: 'var(--Space-16) var(--Space-24)',
};
<Portal id="foo">
    <div style={styles}>
        <h1>Diagon Alley!</h1>
    </div>
</Portal>
```