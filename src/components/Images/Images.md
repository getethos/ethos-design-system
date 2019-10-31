
 ## Cloudinary crop settings:
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
     
</div>
```
