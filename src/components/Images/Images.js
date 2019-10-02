import React from 'react'
import PropTypes from 'prop-types'
import cloudinary from 'cloudinary-core'
import useRequired from '../../hooks/useRequired.js'
import useInvalid from '../../hooks/useInvalid.js'

// https://cloudinary.com/documentation/image_transformation_reference

export const CLOUDINARY_CLOUD_NAME = 'getethos'

const cld = new cloudinary.Cloudinary({
  cloud_name: CLOUDINARY_CLOUD_NAME,
})

const BREAKPOINTS = [600, 900, 1200]

export const CloudinaryImage = ({
  publicId,
  className,
  alt,
  width,
  height,
  ...rest
}) => {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['publicId', 'alt'])
  let allRelevantProps = Object.assign({}, rest, {
    publicId,
    alt,
  })
  includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(CloudinaryImage.PUBLIC_PROPS)
  )
  includesInvalid(rest)

  const srcSetOptions = Object.assign(
    {},
    {
      // Find information on image transformations here:
      // https://cloudinary.com/documentation/image_transformations
      quality: 'auto',
      fetchFormat: 'auto',
      srcset: {
        breakpoints: [600, 900, 1200],
        sizes: true,
      },
      dpr: 'auto',
      crop: 'fill', // ?
      secure: 'true', // ?
    },
    !!width ? { width } : {},
    !!height ? { height } : {}
  )

  const srcSet = cld.imageTag(publicId, srcSetOptions).getAttr('srcset')

  return (
    <img
      className={['Image lazyload', className].join(' ')}
      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      data-src=""
      data-sizes="auto"
      srcSet={srcSet}
      alt={alt}
      {...rest}
    />
  )
}

CloudinaryImage.PUBLIC_PROPS = {
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  publicId: PropTypes.string.isRequired,
}

CloudinaryImage.propTypes = CloudinaryImage.PUBLIC_PROPS
