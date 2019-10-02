```jsx
<div style={{ width: 650 }}>
  <ul>
    <li>These images should lazy load.</li>
    <li>
      When viewed in a retina screen (like a macbook) this will load a high
      resolution image.
    </li>
    <li>
      You can test this image's responsiveness with chrome inspector using an
      ipad, an iphone 6/7/8, and an iphone 5/SE; they should load different
      images based on device resolution (although the specifics are determined
      by ) and hard refreshing with different devices.
    </li>
  </ul>
  <CloudinaryImage
    width={650}
    alt="father and kids playing"
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
</div>

<br/>
<br/>

<ul>
  <li>Due to not being constrained by the `width` property, this image should be bigger. It should also load a very large, retina-resolution image in comparison to the above image.
  </li>
  <li>
    Without getting passed in a "width" prop, this image will be higher resolution on all retina displays, despite sometimes displaying smaller. I think this is OK, although it seems off?
  </li>
</ul>
<CloudinaryImage
  alt="father and kids playing"
  publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
/>
```
