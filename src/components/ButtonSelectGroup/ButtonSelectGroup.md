## Description 

## Examples

### Base Usage

```jsx
<ButtonSelectGroup
  label="Health"
>
  <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Exellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```

### Rendering with a `defaultValue`

```jsx
<ButtonSelectGroup
  defaultValue="great"
  label="Health"
>
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
  defaultValue="great"
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
