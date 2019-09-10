### Description
`<ButtonSelectGroup />` renders a group of button that behaves similarly to a radio group


### Examples

### Base Usage

```jsx
<ButtonSelectGroup label="Health">
  <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Exellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```

### Rendering with a `defaultValue` selected

```jsx
<ButtonSelectGroup defaultValue="great" label="Health">
  <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Exellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```

### Handling `onSelect`

```jsx
<ButtonSelectGroup
  defaultValue="excellent"
  label="Health"
  onSelect={({ value }) => console.log(value)}
>
  <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Exellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```


### Handling an `onClick` event on a specific `<Option/>` 

```jsx
<ButtonSelectGroup
  defaultValue="excellent"
  label="Health"
  onSelect={({ value }) => console.log(value)}
>
  <ButtonSelectGroup.Option onClick={() => console.log('i was clicked!')} value="average">Average</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Exellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```