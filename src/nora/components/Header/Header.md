A very simple header with no children:

```jsx
<Header name="nora-header-no-title" />
```

Since we used fixed position, this will cover the example from above.

```jsx
const Profile = () => {
  return <span>Profile</span>
}
;<Header leftChildren="Nora" rightChildren={Profile()} name="nora-header" />
```
