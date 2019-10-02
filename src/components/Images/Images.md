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
<div style={{borderBottom: '1px solid grey', width: '100%'}}/>
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

<br/>
<br/>
<div style={{borderBottom: '1px solid grey', width: '100%'}}/>
<br/>

<div style={{width: 500, backgroundColor: '#ddd', padding: 10}}>
  <strong>Div of width 500, padding 10 starting here.</strong>
  <ul>
    <li>Crop prop 'fit' passed in to an image that is way too small.</li>
    <li>This is way too small on purpose, because we passed in width and height props of 500.</li>
    <li>Like the image itself, this displays as a rectangular block, despite height and width both being 500.</li>
  </ul>
  <CloudinaryImage
    crop="fit"
    alt="father and kids playing"
    width={500}
    height={500}
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
  <br/>
  <br/>
  <div style={{borderBottom: '1px solid grey', width: '100%'}}/>
  <br/>

  <ul>
    <li>Crop prop 'fill' passed in to an image that is way too small.</li>
    <li>Unlike the image itself, this displays as a 500x500 square.</li>
  </ul>
  <CloudinaryImage
    crop="fill"
    alt="father and kids playing"
    width={500}
    height={500}
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
  <br/>
  <br/>
  <div style={{borderBottom: '1px solid grey', width: '100%'}}/>
  <br/>
  <ul>
    <li>Crop prop 'crop' passed in to an image that is way too small.</li>
    <li>This just displays the top left 500x500 pixels at the center of the image.</li>
    <li>(Note: It's possible to use Cloudinary's facial recognition tech to find and focus on the faces, although this costs more. More information <a style={{color:'blue'}} href="https://cloudinary.com/documentation/advanced_facial_attributes_detection_addon">here</a>.</li>
    <li>Right now we have a variety of 'transformation presets' entered manually instead. If you have access to the cms 1password you can see them <a style={{color:'blue'}} href="https://cloudinary.com/console/media_library/asset/manage/analysis/image/upload/01_NEW%20Lifestyle%20(Rebrand)%2Flife-insurance-father-and-kids-playing">here</a>.</li>
  </ul>
  <CloudinaryImage
    crop="crop"
    alt="father and kids playing"
    width={500}
    height={500}
    publicId="v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
</div>
```
