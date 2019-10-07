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

const BREAKPOINTS = [
  Media.BREAKPOINTS.TABLET_RANGE_START,
  Media.BREAKPOINTS.LAPTOP_RANGE_START,
  Media.BREAKPOINTS.DESKTOP_RANGE_START,
]

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
  })
  includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(CloudinaryImage.PUBLIC_PROPS)
  )
  includesInvalid(rest)

  //   const srcSetOptions = Object.assign(
  //     {},
  //     {
  //       // Find information on image transformations here:
  //       // https://cloudinary.com/documentation/image_transformations
  //       quality: 'auto:eco',
  //       // fetchFormat: 'auto',
  //       srcset: {
  //         breakpoints: BREAKPOINTS,
  //         sizes: true,
  //       },
  //       dpr: 'auto',
  //       crop: crop,
  //       secure: 'true', // for HTTPS
  //
  //       // detection: 'adv_face', // https://cloudinary.com/documentation/advanced_facial_attributes_detection_addon
  //     },
  //     !!width ? { width } : {},
  //     !!height ? { height } : {}
  //   )

  // const srcSet = cld.imageTag(publicId, srcSetOptions).getAttr('srcset')

  // console.log(srcSetOptions)
  const baseImageSetting = {
    dpr: 'auto',
    quality: 'auto:eco',
    crop: crop,
    secure: true,
    flags: ['progressive:semi'],
  }

  const phoneImageSettings = {
    ...baseImageSetting,
    width: width[0],
    height: height[0],
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
  const phoneUrlWebP = cld.url(publicId, phoneImageWebP)
  const phoneUrlJp2 = cld.url(publicId, phoneImageJp2)
  const phoneUrlJpeg = cld.url(publicId, phoneImageJpeg)

  const tabletImageSettings = {
    ...baseImageSetting,
    width: width[1],
    height: height[1],
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
  const tabletUrlWebP = cld.url(publicId, tabletImageWebP)
  const tabletUrlJp2 = cld.url(publicId, tabletImageJp2)
  const tabletUrlJpeg = cld.url(publicId, tabletImageJpeg)

  const laptopImageSettings = {
    ...baseImageSetting,
    width: width[2],
    height: height[2],
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
  const laptopUrlWebP = cld.url(publicId, laptopImageWebP)
  const laptopUrlJp2 = cld.url(publicId, laptopImageJp2)
  const laptopUrlJpeg = cld.url(publicId, laptopImageJpeg)

  const desktopImageSettings = {
    ...baseImageSetting,
    width: width[3],
    height: height[3],
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
  const desktopUrlWebP = cld.url(publicId, desktopImageWebP)
  const desktopUrlJp2 = cld.url(publicId, desktopImageJp2)
  const desktopUrlJpeg = cld.url(publicId, desktopImageJpeg)

  return (
    <picture>
      <source
        media={`(min-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START}px)`}
        // srcset="desktop-@3x.webp 3x, desktop-@2x.webp 2x, desktop.webp 1x"
        data-srcset={desktopUrlWebP}
        type="image/webp"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`}
        // srcset="laptop-@3x.webp 3x, laptop-@2x.webp 2x, laptop.webp 1x"
        data-srcset={laptopUrlWebP}
        type="image/webp"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`}
        // srcset="tablet-@3x.webp 3x, tablet-@2x.webp 2x, tablet.webp 1x"
        data-srcset={tabletUrlWebP}
        type="image/webp"
      />
      <source
        media={`(max-width: ${Media.BREAKPOINTS.PHONE_RANGE_END}px)`}
        // srcset="phone-@3x.webp 3x, phone-@2x.webp 2x, phone.webp 1x"
        data-srcset={phoneUrlWebP}
        type="image/webp"
      />

      <source
        media={`(min-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START}px)`}
        // srcset="desktop-@3x.jp2 3x, desktop-@2x.jp2 2x, desktop.jp2 1x"
        data-srcset={desktopUrlJp2}
        type="image/jp2"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`}
        // srcset="laptop-@3x.jp2 3x, laptop-@2x.jp2 2x, laptop.jp2 1x"
        data-srcset={laptopUrlJp2}
        type="image/jp2"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`}
        // srcset="tablet-@3x.jp2 3x, tablet-@2x.jp2 2x, tablet.jp2 1x"
        data-srcset={tabletUrlJp2}
        type="image/jp2"
      />
      <source
        media={`(max-width: ${Media.BREAKPOINTS.PHONE_RANGE_END}px)`}
        // srcset="phone-@3x.jp2 3x, phone-@2x.jp2 2x, phone.jp2 1x"
        data-srcset={phoneUrlJp2}
        type="image/jp2"
      />

      <source
        media={`(min-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START}px)`}
        // srcset="desktop-@3x.jpg 3x, desktop-@2x.jpg 2x, desktop.jpg 1x"
        data-srcset={desktopUrlJpeg}
        type="image/jpeg"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`}
        // srcset="laptop-@3x.jpg 3x, laptop-@2x.jpg 2x, laptop.jpg 1x"
        data-srcset={laptopUrlJpeg}
        type="image/jpeg"
      />
      <source
        media={`(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`}
        // srcset="tablet-@3x.jpg 3x, tablet-@2x.jpg 2x, tablet.jpg 1x"
        data-srcset={tabletUrlJpeg}
        type="image/jpeg"
      />
      <img
        data-src={phoneUrlJpeg}
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
  height: PropTypes.array.isRequired,
  width: PropTypes.array.isRequired,
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  publicId: PropTypes.string.isRequired,
  crop: PropTypes.oneOf(Object.values(CloudinaryImage.CROP_METHODS)),
}

CloudinaryImage.defaultProps = {
  crop: CloudinaryImage.CROP_METHODS.FILL,
}

CloudinaryImage.propTypes = CloudinaryImage.PUBLIC_PROPS
