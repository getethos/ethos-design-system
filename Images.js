import React from 'react'
import PropTypes from 'prop-types'
import * as Cloudinary from 'cloudinary-react'

// https://cloudinary.com/documentation/image_transformation_reference

export const CLOUDINARY_CLOUD_NAME = 'ethos-media'

const publicIdBase = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`

export const CloudinaryImage = ({ publicId, ...rest }) => {
  const publicIdFilename = publicId.replace(publicIdBase, '')
  return (
    <Cloudinary.Image
      {...rest}
      className="Image"
      cloudName={CLOUDINARY_CLOUD_NAME}
      dpr={2} // should optimize
      publicId={publicIdFilename}
      crop="fill" // aka CSS cover
      secure="true"
    />
  )
}

CloudinaryImage.propTypes = {
  publicId: PropTypes.string.isRequired,
}
