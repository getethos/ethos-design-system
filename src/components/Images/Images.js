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

  // Serve a simpler version if resource is SVG
  if(publicId.split('.').pop() === 'svg'){

    const baseSvgSettings = {
      secure: true,
    }

    const svgUrl = cld.url(publicId, baseSvgSettings)

    return (
      <img
        data-src={svgUrl}
        className={['Image lazyload', className].join(' ')}
        alt={alt}
      />
    )
  }

  const baseImageSettings = {
    quality: 'auto:eco',
    crop: crop,
    secure: true,
    flags: ['progressive:semi'],
  }

  const dpr1Setting = {
    dpr: '1.0'
  }

  const dpr2Setting = {
    dpr: '2.0'
  }

  const dpr3Setting = {
    dpr: '3.0'
  }

  // ------------------------------
  // Phone Settings
  // ------------------------------
  const phoneImageSettings = {
    ...baseImageSettings,
    // ?  width[0].isInteger() : false,
    ...(!!width[0]) && { width: width[0]},
    ...(!!height[0]) && { height: height[0]},
  }

  const phoneImageWebP = {
    ...phoneImageSettings,
    format: 'webp'
  }

  const phoneImageJp2 = {
    ...phoneImageSettings,
    format: 'jp2'
  }

  const phoneImageJpeg = {
    ...phoneImageSettings,
    format: 'jpeg'
  }

  const phoneUrlWebP = cld.url(publicId, {...phoneImageWebP, ...dpr1Setting})
  const phoneUrlJp2 = cld.url(publicId, {...phoneImageJp2, ...dpr1Setting})
  const phoneUrlJpeg = cld.url(publicId, {...phoneImageJpeg, ...dpr1Setting})

  const phoneUrlWebP_2x = cld.url(publicId, {...phoneImageWebP, ...dpr2Setting})
  const phoneUrlJp2_2x = cld.url(publicId, {...phoneImageJp2, ...dpr2Setting})
  const phoneUrlJpeg_2x = cld.url(publicId, {...phoneImageJpeg, ...dpr2Setting})

  const phoneUrlWebP_3x = cld.url(publicId, {...phoneImageWebP, ...dpr3Setting})
  const phoneUrlJp2_3x = cld.url(publicId, {...phoneImageJp2, ...dpr3Setting})
  const phoneUrlJpeg_3x = cld.url(publicId, {...phoneImageJpeg, ...dpr3Setting})

  // ------------------------------
  // Tablet Settings
  // ------------------------------
  const tabletImageSettings = {
    ...baseImageSettings,
    ...(!!width[1]) && { width: width[1]},
    ...(!!height[1]) && { height: height[1]},
  }

  const tabletUrl = cld.url(publicId, tabletImageSettings)

  const tabletImageWebP = {
    ...tabletImageSettings,
    format: 'webp'
  }

  const tabletImageJp2 = {
    ...tabletImageSettings,
    format: 'jp2'
  }

  const tabletImageJpeg = {
    ...tabletImageSettings,
    format: 'jpeg'
  }

  const tabletUrlWebP = cld.url(publicId, {...tabletImageWebP, ...dpr1Setting})
  const tabletUrlJp2 = cld.url(publicId, {...tabletImageJp2, ...dpr1Setting})
  const tabletUrlJpeg = cld.url(publicId, {...tabletImageJpeg, ...dpr1Setting})

  const tabletUrlWebP_2x = cld.url(publicId, {...tabletImageWebP, ...dpr2Setting})
  const tabletUrlJp2_2x = cld.url(publicId, {...tabletImageJp2, ...dpr2Setting})
  const tabletUrlJpeg_2x = cld.url(publicId, {...tabletImageJpeg, ...dpr2Setting})

  const tabletUrlWebP_3x = cld.url(publicId, {...tabletImageWebP, ...dpr3Setting})
  const tabletUrlJp2_3x = cld.url(publicId, {...tabletImageJp2, ...dpr3Setting})
  const tabletUrlJpeg_3x = cld.url(publicId, {...tabletImageJpeg, ...dpr3Setting})

  // ------------------------------
  // Laptop Settings
  // ------------------------------
  const laptopImageSettings = {
    ...baseImageSettings,
    ...(!!width[2]) && { width: width[2]},
    ...(!!height[2]) && { height: height[2]},
  }

  const laptopUrl = cld.url(publicId, laptopImageSettings)

  const laptopImageWebP = {
    ...laptopImageSettings,
    format: 'webp'
  }

  const laptopImageJp2 = {
    ...laptopImageSettings,
    format: 'jp2'
  }

  const laptopImageJpeg = {
    ...laptopImageSettings,
    format: 'jpeg'
  }

  const laptopUrlWebP = cld.url(publicId, {...laptopImageWebP, ...dpr1Setting})
  const laptopUrlJp2 = cld.url(publicId, {...laptopImageJp2, ...dpr1Setting})
  const laptopUrlJpeg = cld.url(publicId, {...laptopImageJpeg, ...dpr1Setting})

  const laptopUrlWebP_2x = cld.url(publicId, {...laptopImageWebP, ...dpr2Setting})
  const laptopUrlJp2_2x = cld.url(publicId, {...laptopImageJp2, ...dpr2Setting})
  const laptopUrlJpeg_2x = cld.url(publicId, {...laptopImageJpeg, ...dpr2Setting})

  const laptopUrlWebP_3x = cld.url(publicId, {...laptopImageWebP, ...dpr3Setting})
  const laptopUrlJp2_3x = cld.url(publicId, {...laptopImageJp2, ...dpr3Setting})
  const laptopUrlJpeg_3x = cld.url(publicId, {...laptopImageJpeg, ...dpr3Setting})

  // ------------------------------
  // Desktop Settings
  // ------------------------------
  const desktopImageSettings = {
    ...baseImageSettings,
    ...(!!width[3]) && { width: width[3]},
    ...(!!height[3]) && { height: height[3]},
  }

  const desktopUrl = cld.url(publicId, desktopImageSettings)

  const desktopImageWebP = {
    ...desktopImageSettings,
    format: 'webp'
  }

  const desktopImageJp2 = {
    ...desktopImageSettings,
    format: 'jp2'
  }

  const desktopImageJpeg = {
    ...desktopImageSettings,
    format: 'jpeg'
  }

  const desktopUrlWebP = cld.url(publicId, {...desktopImageWebP, ...dpr1Setting})
  const desktopUrlJp2 = cld.url(publicId, {...desktopImageJp2, ...dpr1Setting})
  const desktopUrlJpeg = cld.url(publicId, {...desktopImageJpeg, ...dpr1Setting})

  const desktopUrlWebP_2x = cld.url(publicId, {...desktopImageWebP, ...dpr2Setting})
  const desktopUrlJp2_2x = cld.url(publicId, {...desktopImageJp2, ...dpr2Setting})
  const desktopUrlJpeg_2x = cld.url(publicId, {...desktopImageJpeg, ...dpr2Setting})

  const desktopUrlWebP_3x = cld.url(publicId, {...desktopImageWebP, ...dpr3Setting})
  const desktopUrlJp2_3x = cld.url(publicId, {...desktopImageJp2, ...dpr3Setting})
  const desktopUrlJpeg_3x = cld.url(publicId, {...desktopImageJpeg, ...dpr3Setting})

  return (
    <picture>
      <source
        media={`(min-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START}px)`}
        data-srcset={`${desktopUrlWebP_3x} 3x, ${desktopUrlWebP_2x} 2x, ${desktopUrlWebP} 1x`}
        type="image/webp"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`}
        data-srcset={`${laptopUrlWebP_3x} 3x, ${laptopUrlWebP_2x} 2x, ${laptopUrlWebP} 1x`}
        type="image/webp"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`}
        data-srcset={`${tabletUrlWebP_3x} 3x, ${tabletUrlWebP_2x} 2x, ${tabletUrlWebP} 1x`}
        type="image/webp"
      />
      <source
        media={`(max-width: ${Media.BREAKPOINTS.PHONE_RANGE_END}px)`}
        data-srcset={`${phoneUrlWebP_3x} 3x, ${phoneUrlWebP_2x} 2x, ${phoneUrlWebP} 1x`}
        type="image/webp"
      />

      <source
        media={`(min-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START}px)`}
        data-srcset={`${desktopUrlJp2_3x} 3x, ${desktopUrlJp2_2x} 2x, ${desktopUrlJp2} 1x`}
        type="image/jp2"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`}
        data-srcset={`${laptopUrlJp2_3x} 3x, ${laptopUrlJp2_2x} 2x, ${laptopUrlJp2} 1x`}
        type="image/jp2"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`}
        data-srcset={`${tabletUrlJp2_3x} 3x, ${tabletUrlJp2_2x} 2x, ${tabletUrlJp2} 1x`}
        type="image/jp2"
      />
      <source
        media={`(max-width: ${Media.BREAKPOINTS.PHONE_RANGE_END}px)`}
        data-srcset={`${phoneUrlJp2_3x} 3x, ${phoneUrlJp2_2x} 2x, ${phoneUrlJp2} 1x`}
        type="image/jp2"
      />

      <source
        media={`(min-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START}px)`}
        data-srcset={`${desktopUrlJpeg_3x} 3x, ${desktopUrlJpeg_2x} 2x, ${desktopUrlJpeg} 1x`}
        type="image/jpeg"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`}
        data-srcset={`${laptopUrlJpeg_3x} 3x, ${laptopUrlJpeg_2x} 2x, ${laptopUrlJpeg} 1x`}
        type="image/jpeg"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`}
        data-srcset={`${tabletUrlJpeg_3x} 3x, ${tabletUrlJpeg_2x} 2x, ${tabletUrlJpeg} 1x`}
        type="image/jpeg"
      />
      <img
        data-src={phoneUrlJpeg}
        data-srcset={`${phoneUrlJpeg_3x} 3x, ${phoneUrlJpeg_2x} 2x, ${phoneUrlJpeg} 1x`}
        className={['Image lazyload', className].join(' ')}
        alt={alt}
      />
    </picture>
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

CloudinaryImage.PUBLIC_PROPS = {
  height: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  publicId: PropTypes.string.isRequired,
  crop: PropTypes.oneOf(Object.values(CloudinaryImage.CROP_METHODS)),
}

CloudinaryImage.defaultProps = {
  crop: CloudinaryImage.CROP_METHODS.FILL,
}

CloudinaryImage.propTypes = CloudinaryImage.PUBLIC_PROPS
