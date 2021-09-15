Set of Design-approved public buttons.

---

## Color + border styles

```jsx
<Button.Medium.Black>Button.Medium.Black</Button.Medium.Black>
```

```jsx
<Button.Medium.BlackOutline>
  Button.Medium.BlackOutline
</Button.Medium.BlackOutline>
```

```jsx
<div style={{ backgroundColor: 'var(--BrandForest)', padding: 20 }}>
  <strong style={{ color: 'white' }}>
    Background supplied so the button is visible.
  </strong>
  <br />
  <br />
  <Button.Medium.WhiteOutline>
    Button.Medium.WhiteOutline
  </Button.Medium.WhiteOutline>
</div>
```

```jsx
<Button.Medium.Stateful.Default>
  Button.Medium.Stateful.Default
</Button.Medium.Stateful.Default>
```

```jsx
<Button.Medium.Stateful.Default isSelected={true}>
  Button.Medium.Stateful.Default
</Button.Medium.Stateful.Default>
```

```jsx
<Button.Unstyled>Button.Unstyled</Button.Unstyled>
```

---

## Fullwidth prop

```jsx
<Button.Medium.Black fullWidth>
  Button.Medium.Black fullWidth
</Button.Medium.Black>
```

---

## Arrow icons

#### Forward + back

```jsx
<Button.Medium.Black arrowIcon>
  Button.Medium.Black with arrowIcon
</Button.Medium.Black>
```

```jsx
<Button.Medium.Black backArrowIcon>
  Button.Medium.Black + backArrowIcon
</Button.Medium.Black>
```

```jsx
<Button.Medium.Black refreshIcon>
  Edit Answers
</Button.Medium.Black>
```

#### Fullwidth

```jsx
<Button.Medium.Black fullWidth arrowIcon>
  Button.Medium.Black + fullWidth + arrowIcon
</Button.Medium.Black>
```

```jsx
<Button.Medium.Black fullWidth backArrowIcon>
  Button.Medium.Black + fullWidth + backArrowIcon
</Button.Medium.Black>
```

```jsx
<Button.Medium.Black refreshIcon fullWidth>
  Edit Answers
</Button.Medium.Black>
```

#### Colors + colors when hovered

```jsx
<Button.Medium.Stateful.Default arrowIcon>
  Button.Medium.Stateful.Default + arrowIcon
</Button.Medium.Stateful.Default>
```

```jsx
<Button.Medium.BlackOutline arrowIcon>
  Button.Medium.BlackOutline + arrowIcon
</Button.Medium.BlackOutline>
```

```jsx
<Button.Unstyled arrowIcon>
  Button.Unstyled + arrowIcon (different margin on arrow)
</Button.Unstyled>
```

```jsx
<Button.Unstyled backArrowIcon>Button.Unstyled + backArrowIcon</Button.Unstyled>
```

## Custom Debouncing

```
<Button.Medium.Black
  onClick={() => console.log("test")}
  debounceDurationMs={1000}
>
  Click Me
</Button.Medium.Black>

```

---

## Do not use

#### The following are only for use in indicated places

PLEASE ONLY USE IN UniversalNavbar! In fact, have a look at
UniversalNavbar component to see this in use.

```jsx
<Button.Small.BlackOutline>
  Only use for UniversalNavbar!
</Button.Small.BlackOutline>
```

PLEASE ONLY USE FOR CMS hero CTA

```jsx
<Button.WhiteCTA>Button.WhiteCTA—Only for CMS hero CTA</Button.WhiteCTA>
```
