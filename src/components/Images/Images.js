import React from 'react'
import PropTypes from 'prop-types'
import * as Cloudinary from 'cloudinary-react'

// https://cloudinary.com/documentation/image_transformation_reference

export const CLOUDINARY_CLOUD_NAME = 'getethos'

const publicIdBase = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`

export const CloudinaryImage = ({ publicId, className, crop, ...rest }) => {
  const publicIdFilename = publicId.replace(publicIdBase, '')
  return (
    <Cloudinary.Image
      {...rest}
      className={['Image', className].join(' ')}
      cloudName={CLOUDINARY_CLOUD_NAME}
      dpr="auto"
      responsive
      publicId={publicIdFilename}
      crop={crop} 
      secure="true"
      flags="progressive:semi"
    />
  )
}

/**
* https://cloudinary.com/documentation/image_transformation_reference#crop_parameter
* 
* fill: Create an image with the exact given width and height without distorting the 
*       image. This option first scales as much as needed to at least fill both of the 
*       given dimensions. If the requested aspect ratio is different than the original, 
*       cropping will occur on the dimension that exceeds the requested size after scaling.
*       Similar to CSS background-size "cover".
*
* fit: The image is resized so that it takes up as much space as possible within 
*      a bounding box defined by the given width and height parameters. The original 
*      aspect ratio is retained and all of the original image is visible.
*      Similar to CSS background-size "contain".
*
* crop: Used to extract a given width & height out of the original image. The original 
*       proportions are retained and so is the size of the graphics.
*       Similar to CSS background-size "auto".
*
*
**/
CloudinaryImage.CROP_METHODS = {
  FILL: 'fill',
  FIT: 'fit',
  CROP: 'crop',

}

CloudinaryImage.propTypes = {
  // We're trying to avoid/reduce className restyling, but let's try it here:
  className: PropTypes.string,
  publicId: PropTypes.string.isRequired,
  crop: PropTypes.oneOf(Object.values(CloudinaryImage.CROP_METHODS)),
}

CloudinaryImage.defaultProps = {
  crop: 'fill',
}
