Keyboard navigation:

- Space or Enter—toggles an accordion section from collapsed to expanded and and vice versa
- Tab—Focuses on next section header
- Down Arrow—moves focus to next section header until last, where it will move to first header
- Up Arrow—moves focus to previous section header until first, where it will move to last header
- Home—moves focus to first section header
- End—moves focus to last section header

```jsx
import { AccordionSection } from './AccordionSection.js'
import { useAccordionState } from './useAccordionState'
const { expanded, onToggle } = useAccordionState({ 1: true })
// The idea is you can use whatever you want for this. Just base your
// two jsx elements on `expanded` callback boolean. Put differently,
// Ethos doesn't use '▲' : '▼' so these are only for example's sake!
const toggleChild = (expanded) => {
  return <span aria-hidden={true}>{expanded ? '▲' : '▼'}</span>
}
;<Accordion expanded={expanded} onToggle={onToggle}>
  <AccordionSection title="Section 1" id="id1" renderToggle={toggleChild}>
    Lorem ipsum dolor sit amet
  </AccordionSection>
  <AccordionSection title="Section 2" id="id2" renderToggle={toggleChild}>
    <p>
      Suspendisse lobortis diam quis magna faucibus Lorem ipsum dolor sit amet,
      cum ei veniam volutpat, vim ne vide aliquid ocurreret, id eam agam
      eripuit. Eu tota facilisi eam, affert ocurreret instructior eu qui. Ex per
      clita essent dolorem, te everti blandit detraxit mea, at mea tacimates
      sententiae. Vim ferri aperiam ad.
    </p>
    <p>
      Mazim maiorum scripserit cu eum, id has veri mentitum deseruisse, mea ei
      malis laoreet necessitatibus. No errem scaevola mel, ne doctus suscipit
      neglegentur qui. Nam ne splendide dissentiet philosophia, dicant quaeque
      accommodare ex vim, recusabo consulatu cum ei. Modus malorum eam ei,
      bonorum deterruisset mel id. Qui eros vivendum ea, no tota senserit duo.
      Latine aliquando ut per, vel at tritani scaevola.
    </p>
  </AccordionSection>
  <AccordionSection title="Section 3" id="id3" renderToggle={toggleChild}>
    <p>
      Mazim maiorum scripserit cu eum, id has veri mentitum deseruisse, mea ei
      malis laoreet necessitatibus. No errem scaevola mel, ne doctus suscipit
      neglegentur qui. Nam ne splendide dissentiet philosophia, dicant quaeque
    </p>
    <p>
      Mazim maiorum scripserit cu eum, id has veri mentitum deseruisse, mea ei
      malis laoreet necessitatibus. No errem scaevola mel, ne doctus suscipit
      neglegentur qui. Nam ne splendide dissentiet philosophia, dicant quaeque
    </p>
  </AccordionSection>
</Accordion>
```

Accordion component also allows you to pass in a boolean, `toggleChildIsTarget`
that indicates that you'd like to use that as the toggle (not the entire
`AccordionSection` header bar).

```jsx
import { AccordionSection } from './AccordionSection.js'
import { useAccordionState } from './useAccordionState'
const { expanded, onToggle } = useAccordionState({ 1: true })
// The idea is you can use whatever you want for this. Just base your
// two jsx elements on `expanded` callback boolean. Put differently,
// Ethos doesn't use 'X' : '+' so these are only for example's sake!
const toggleChild = (expanded) => {
  return <span aria-hidden={true}>{expanded ? 'X' : '+'}</span>
}
;<Accordion toggleChildIsTarget={true} expanded={expanded} onToggle={onToggle}>
  <AccordionSection title="Section 1" id="id1" renderToggle={toggleChild}>
    Lorem ipsum dolor sit amet
  </AccordionSection>
  <AccordionSection title="Section 2" id="id2" renderToggle={toggleChild}>
    <p>
      Suspendisse lobortis diam quis magna faucibus Lorem ipsum dolor sit amet,
      cum ei veniam volutpat, vim ne vide aliquid ocurreret, id eam agam
      eripuit. Eu tota facilisi eam, affert ocurreret instructior eu qui. Ex per
      clita essent dolorem, te everti blandit detraxit mea, at mea tacimates
      sententiae. Vim ferri aperiam ad.
    </p>
    <p>
      Mazim maiorum scripserit cu eum, id has veri mentitum deseruisse, mea ei
      malis laoreet necessitatibus. No errem scaevola mel, ne doctus suscipit
      neglegentur qui. Nam ne splendide dissentiet philosophia, dicant quaeque
      accommodare ex vim, recusabo consulatu cum ei. Modus malorum eam ei,
      bonorum deterruisset mel id. Qui eros vivendum ea, no tota senserit duo.
      Latine aliquando ut per, vel at tritani scaevola.
    </p>
  </AccordionSection>
  <AccordionSection title="Section 3" id="id3" renderToggle={toggleChild}>
    <p>
      Mazim maiorum scripserit cu eum, id has veri mentitum deseruisse, mea ei
      malis laoreet necessitatibus. No errem scaevola mel, ne doctus suscipit
      neglegentur qui. Nam ne splendide dissentiet philosophia, dicant quaeque
    </p>
    <p>
      Mazim maiorum scripserit cu eum, id has veri mentitum deseruisse, mea ei
      malis laoreet necessitatibus. No errem scaevola mel, ne doctus suscipit
      neglegentur qui. Nam ne splendide dissentiet philosophia, dicant quaeque
    </p>
  </AccordionSection>
</Accordion>
```
