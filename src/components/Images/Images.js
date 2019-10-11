import React from 'react'
import PropTypes from 'prop-types'
import cloudinary from 'cloudinary-core'
import useRequired from '../../hooks/useRequired.js'
import useInvalid from '../../hooks/useInvalid.js'
import { Media } from '../Media/Media'
import lazysizes from 'lazysizes'

// https://cloudinary.com/documentation/image_transformation_reference

export const CLOUDINARY_CLOUD_NAME = 'getethos'

const cld = new cloudinary.Cloudinary({
  cloud_name: CLOUDINARY_CLOUD_NAME,
})

export const CloudinaryImage = ({
  publicId,
  className,
  alt,
  width,
  height,
  crop,
  lazyload,
  ...rest
}) => {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['publicId', 'alt'])
  let allRelevantProps = Object.assign({}, rest, {
    publicId,
    alt,
    width,
    height,
  })
  includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(CloudinaryImage.PUBLIC_PROPS)
  )
  includesInvalid(rest)

  let publicIdBase = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`
  let publicIdFilename = publicId.replace(publicIdBase, '')

  let imageClasses = lazyload ? 'Image lazyload' : 'Image'
  if (className) {
    imageClasses = [imageClasses, className].join(' ')
  }

  // Serve a simpler version if resource is SVG
  if (publicId.split('.').pop() === 'svg') {
    let baseSvgSettings = {
      secure: true,
    }

    let svgUrl = cld.url(publicIdFilename, baseSvgSettings)

    return <img data-src={svgUrl} className={imageClasses} alt={alt} />
  }

  let baseImageSettings = {
    quality: 'auto:eco',
    crop: crop,
    secure: true,
    flags: ['progressive:semi'],
  }

  let fileFormats = ['webp', 'jp2', 'jpeg']

  let dprSettings = ['1.0', '2.0', '3.0']

  let mediaBreakpoints = [
    Media.BREAKPOINTS.DESKTOP_RANGE_START,
    Media.BREAKPOINTS.LAPTOP_RANGE_START,
    Media.BREAKPOINTS.TABLET_RANGE_START,
    Media.BREAKPOINTS.PHONE_RANGE_END,
  ]

  // We are expecting width/height attribute arrays in the order of
  // Phone/Tablet/Laptop/Desktop but we have to setup media queries
  // in the opposite order, so we reverse the arrays here.
  if (width) {
    width.reverse()
  }
  if (height) {
    height.reverse()
  }

  let sourceTags = []
  let srcSetAttribute = lazyload ? 'data-srcset' : 'srcSet'
  let srcAttribute = lazyload ? 'data-src' : 'src'

  for (let format = 0; format < fileFormats.length; format++) {
    for (
      let breakpoint = 0;
      breakpoint < mediaBreakpoints.length;
      breakpoint++
    ) {
      let srcsetData = []

      for (let dpr = 0; dpr < dprSettings.length; dpr++) {
        let imageSettings = {
          ...baseImageSettings,
          ...(!!width[breakpoint] && { width: width[breakpoint] }),
          ...(!!height[breakpoint] && { height: height[breakpoint] }),
          format: fileFormats[format],
          dpr: dprSettings[dpr],
        }

        srcsetData.push(
          cld.url(publicIdFilename, imageSettings) + ` ${dpr + 1}x`
        )
      }
      if (
        format === fileFormats.length - 1 &&
        breakpoint === mediaBreakpoints.length - 1
      ) {
        let imageSettings = {
          ...baseImageSettings,
          format: fileFormats[format],
          dpr: '1.0',
        }

        let srcSetAttributeObject = {}
        srcSetAttributeObject[srcSetAttribute] = srcsetData.join(', ')

        let srcAttributeObject = {}
        srcAttributeObject[srcAttribute] = cld.url(
          publicIdFilename,
          imageSettings
        )

        sourceTags.push(
          <img
            key={`${format}-${breakpoint}`}
            {...srcAttributeObject}
            {...srcSetAttributeObject}
            className={imageClasses}
            alt={alt}
          />
        )
      } else {
        let srcSetAttributeObject = {}
        srcSetAttributeObject[srcSetAttribute] = srcsetData.join(', ')

        let minMax = breakpoint < mediaBreakpoints.length - 1 ? `min` : `max`

        sourceTags.push(
          <source
            key={`${format}-${breakpoint}`}
            media={`(${minMax}-width: ${mediaBreakpoints[breakpoint]}px)`}
            {...srcSetAttributeObject}
            type={`image/${fileFormats[format]}`}
          />
        )
      }
    }
  }

  return <picture>{sourceTags}</picture>
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

CloudinaryImage.PUBLIC_PROPS = {
  height: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  publicId: PropTypes.string.isRequired,
  crop: PropTypes.oneOf(Object.values(CloudinaryImage.CROP_METHODS)),
  lazyload: PropTypes.bool,
}

CloudinaryImage.defaultProps = {
  crop: CloudinaryImage.CROP_METHODS.FILL,
  lazyload: true,
}

CloudinaryImage.propTypes = CloudinaryImage.PUBLIC_PROPS
