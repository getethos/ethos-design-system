
 ## Cloudinary crop:
  https://cloudinary.com/documentation/image_transformation_reference#crop_parameter

* fill: Create an image with the exact given width and height without distorting the
      image. This option first scales as much as needed to at least fill both of the
      given dimensions. If the requested aspect ratio is different than the original,
      cropping will occur on the dimension that exceeds the requested size after scaling.
      Similar to CSS background-size "cover".

* fit: The image is resized so that it takes up as much space as possible within
      a bounding box defined by the given width and height parameters. The original
      aspect ratio is retained and all of the original image is visible.
      Similar to CSS background-size "contain".

* crop: Used to extract a given width & height out of the original image. The original
      proportions are retained and so is the size of the graphics.
      Similar to CSS background-size "auto".

```jsx
import {
  TitleSmall,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  ZipInput,
  EmailInput,
  CloudinaryImage
} from '../index'

;<div style={{ width: 400 }}>
  <TitleSmall.Serif.Book500>Minimal Props</TitleSmall.Serif.Book500>
  <Spacer.H24/>
  <CloudinaryImage
    alt="father and kids playing"
    publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
  />
  <Spacer.H24/>

  <TitleSmall.Serif.Book500>With height/width arrays</TitleSmall.Serif.Book500>
  <Spacer.H24/>
  <CloudinaryImage
    alt="father and kids playing"
    publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
    height={[100,200,300,400]}
    width={[100,200,300,400]}
  />
  <Spacer.H24/>

  <TitleSmall.Serif.Book500>Crop: fit</TitleSmall.Serif.Book500>
  <Spacer.H24/>
  <CloudinaryImage
    alt="father and kids playing"
    publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
    height={[100,200,300,400]}
    width={[100,200,300,400]}
    crop="fit"
  />
  <Spacer.H24/>

  <TitleSmall.Serif.Book500>Crop: crop</TitleSmall.Serif.Book500>
  <Spacer.H24/>
  <CloudinaryImage
    alt="father and kids playing"
    publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
    height={[100,200,300,400]}
    width={[100,200,300,400]}
    crop="crop"
  />
  <Spacer.H24/>

  <TitleSmall.Serif.Book500>SVG</TitleSmall.Serif.Book500>
  <Spacer.H24/>
  <CloudinaryImage
  crop="fill"
  alt="icon test"
  publicId="https://res.cloudinary.com/getethos/image/upload/v1565206784/02_Icons/Icon_slot_3_Duckegg_ktjkor.svg"
  />

  <TitleSmall.Serif.Book500>Lazy load false</TitleSmall.Serif.Book500>
  <Spacer.H24/>
  <CloudinaryImage
    alt="father and kids playing"
    publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
    height={[100,200,300,400]}
    width={[100,200,300,400]}
    crop="fit"
    lazyLoad={false}
  />
  <Spacer.H24/>
</div>
```

 ## PreloadImageTags:
 Goal with this component is to generate a set of tags that can be injected in the header of a server side request to give the browser an idea of which images are important for the page and should be requested with the utmost priority! This is effectively the direct opposite of a lazily loaded cloudinary image.

 ```jsx
 import { PreloadImageTags, CloudinaryImage, TitleSmall } from '../index'
 import { renderToString } from 'react-dom/server'

;<div>
  {/* renderToString is only used to view the output in EDS storybook */}
  {renderToString(<PreloadImageTags
    crop={CloudinaryImage.CROP_METHODS.FIT}
    publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
    height={[100,200,300,400]}
    width={[100,200,300,400]}
  />)}
  <PreloadImageTags
    crop={CloudinaryImage.CROP_METHODS.FIT}
    publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
    height={[100,200,300,400]}
    width={[100,200,300,400]}
  />

  <TitleSmall.Serif.Book500>Expected Use Case:</TitleSmall.Serif.Book500>
  <br/>
  <>
    {/* replace <></> with whichever tag you use to manage head tags */}
    <>
      <PreloadImageTags
        crop={CloudinaryImage.CROP_METHODS.FIT}
    publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
    height={[100,200,300,400]}
    width={[100,200,300,400]}
      />
    </>
    <CloudinaryImage
      alt="father and kids playing"
      publicId="https://res.cloudinary.com/getethos/image/upload/v1565712179/01_NEW%20Lifestyle%20%28Rebrand%29/life-insurance-father-and-kids-playing.jpg"
      height={[100,200,300,400]}
      width={[100,200,300,400]}
      crop="fit"
      lazyLoad={false}
    />
  </>

  </div>
 ```