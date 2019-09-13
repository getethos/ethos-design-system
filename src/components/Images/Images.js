import React from 'react'
import PropTypes from 'prop-types'
import * as Cloudinary from 'cloudinary-react'

// https://cloudinary.com/documentation/image_transformation_reference

export const CLOUDINARY_CLOUD_NAME = 'getethos'

const publicIdBase = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`

export const CloudinaryImage = ({ publicId, className, ...rest }) => {
  const publicIdFilename = publicId.replace(publicIdBase, '')
  return (
    <Cloudinary.Image
      {...rest}
      className={['Image', className].join(' ')}
      cloudName={CLOUDINARY_CLOUD_NAME}
      dpr="auto"
      responsive
      publicId={publicIdFilename}
      crop="fill" // aka CSS cover
      secure="true"
    />
  )
}

CloudinaryImage.propTypes = {
  // We're trying to avoid/reduce className restyling, but let's try it here:
  className: PropTypes.string,
  publicId: PropTypes.string.isRequired,
}
