import React from 'react'
import PropTypes from 'prop-types'
import cloudinary from 'cloudinary-core'
import useRequired from '../../hooks/useRequired.js'
import useInvalid from '../../hooks/useInvalid.js'
import { Media } from '../Media/Media'
import uuidv4 from 'uuid/v4'
import lazysizes from 'lazysizes'

// https://cloudinary.com/documentation/image_transformation_reference
export const CLOUDINARY_CLOUD_NAME = 'getethos'
const cld = new cloudinary.Cloudinary({
  cloud_name: CLOUDINARY_CLOUD_NAME,
})
export const IMAGE_FILE_TYPES = {
  SVG: 'svg',
  WEBP: 'webp',
  JP2: 'jp2',
  JPEG: 'jpeg',
}

const mediaBreakpoints = [
  Media.BREAKPOINTS.DESKTOP_RANGE_START,
  Media.BREAKPOINTS.LAPTOP_RANGE_START,
  Media.BREAKPOINTS.TABLET_RANGE_START,
  Media.BREAKPOINTS.PHONE_RANGE_END,
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
    width,
    height,
  })
  includesRequired(allRelevantProps)

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(
    Object.keys(CloudinaryImage.PUBLIC_PROPS)
  )
  includesInvalid(rest)

  const { WEBP, JP2, JPEG, SVG } = IMAGE_FILE_TYPES
  const baseImageSettings = {
    quality: 'auto:eco',
    crop: crop,
    secure: true,
    flags: ['progressive:semi'],
  }
  let imageClasses = ['Image lazyload', className]
  width && width.reverse()
  height && height.reverse()

  const buildImageTag = () => {
    const format = fileFormats.slice(-1)[0]
    let imageSettings = {
      ...baseImageSettings,
      format: format,
      dpr: '1.0',
    }

    return(
      <img
        key={`${uuidv4()}`}
        data-src={cld.url(filePath(),imageSettings)}
        className={imageClasses.join(' ')}
        alt={alt}
      />
    )
  }

  const buildSrcTags = (format) => {
    const dprSettings = ['1.0', '2.0', '3.0']
    let sourceTags = []

    // We are expecting width/height attribute arrays in the order of
    // Phone/Tablet/Laptop/Desktop but we have to setup media queries
    // in the opposite order, so we reverse the arrays here.
    
    
    for (
      let breakpoint = 0;
      breakpoint < mediaBreakpoints.length;
      breakpoint++
      ) {

      const srcsetData = dprSettings.map((dpr, indx)=>{
        const imageSettings = {
          ...baseImageSettings,
          ...(width && !!width[breakpoint] && { width: width[breakpoint] }),
          ...(height && !!height[breakpoint] && { height: height[breakpoint] }),
          format: format,
          dpr: dpr,
        }

        return cld.url(filePath(), imageSettings) + ` ${indx + 1}x`
      })

      let minMax = breakpoint < mediaBreakpoints.length - 1 ? `min` : `max`
      sourceTags.push(<source
        key={`${uuidv4()}`}
        media={`(${minMax}-width: ${mediaBreakpoints[breakpoint]}px)`}
        data-srcset= {srcsetData.join(', ')}
        type={`image/${format}`}
      />)
      
    }
    return sourceTags
  }

  const filePath = () => {
    let publicIdBase = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`
    return publicId.replace(publicIdBase, '')
  }

  const isSvg = (publicId) => {
    return publicId.split('.').pop() === SVG
  }

  const renderSvg = () =>{
      let baseSvgSettings = {
        secure: true,
      }
  
      let svgUrl = cld.url(filePath(), baseSvgSettings)
      return <img data-src={svgUrl} className={imageClasses.join(' ')} alt={alt} />
  }

  // Serve a simpler version if resource is SVG
  if(isSvg(publicId)) return renderSvg()

  const fileFormats = [WEBP, JP2, JPEG] // Ordered by performance from highest -> least, browsers use first match
  return (
    <picture>
      {fileFormats.map(format => buildSrcTags(format))}
      {buildImageTag()}
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
  height: PropTypes.array,
  width: PropTypes.array,
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  publicId: PropTypes.string.isRequired,
  crop: PropTypes.oneOf(Object.values(CloudinaryImage.CROP_METHODS)),
}

CloudinaryImage.defaultProps = {
  crop: CloudinaryImage.CROP_METHODS.FILL,
}

CloudinaryImage.propTypes = CloudinaryImage.PUBLIC_PROPS
