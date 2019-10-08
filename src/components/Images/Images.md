```jsx
<div style={{ width: 650 }}>
  <CloudinaryImage
    crop="fill"
    alt="father and kids playing"
    width={[250,350,450,550]}
    height={[250,350,450,550]}
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
  <div style={{ height: 1000 }}>Test lazy loading</div>
  <CloudinaryImage
    crop="fit"
    alt="father and kids playing"
    width={[250,350,450,550]}
    height={[250,350,450,550]}
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
  <div style={{ height: 1000 }}>Test lazy loading</div>
  <CloudinaryImage
    crop="crop"
    alt="father and kids playing"
    width={[250,350,450,550]}
    height={[250,350,450,550]}
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
  <br/>
  <p>Test no width</p>
  <CloudinaryImage
    crop="fill"
    alt="father and kids playing"
    width={false}
    height={[250,350,450,550]}
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
  <br/>
  <p>Test no height</p>
  <CloudinaryImage
    crop="fill"
    alt="father and kids playing"
    width={[250,350,450,550]}
    height={false}
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
  <br/>
  <p>Test SVG</p>
  <CloudinaryImage
    crop="fill"
    alt="icon test"
    width={false}
    height={false}
    publicId="v1565206784/02_Icons/Icon_slot_3_Duckegg_ktjkor.svg"
  />
</div>
```
