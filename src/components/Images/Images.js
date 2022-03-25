import React from 'react'
import PropTypes from 'prop-types'
import useRequired from '../../hooks/useRequired.js'
import useInvalid from '../../hooks/useInvalid.js'

import cloudinary from 'cloudinary-core'
import { v4 as uuidv4 } from 'uuid'
// eslint-disable-next-line
import lazysizes from 'lazysizes'

import { Media } from '../Media/Media'
import styles from './Images.module.scss'

// https://cloudinary.com/documentation/image_transformation_reference
export const CLOUDINARY_CLOUD_NAME = 'getethos'
const cld = new cloudinary.Cloudinary({
  cloud_name: CLOUDINARY_CLOUD_NAME,
})

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
  lazyLoad,
  ...rest
}) => {
  // Verify that all required props were supplied
  const [includesRequired] = useRequired(['publicId', 'alt'])
  const allRelevantProps = Object.assign({}, rest, {
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

  const baseImageSettings = {
    quality: 'auto:eco',
    crop,
    secure: true,
    fetchFormat: 'auto',
    flags: ['progressive:semi'],
  }
  let imageClasses = [className]
  if (lazyLoad) {
    imageClasses.push('lazyload')
  }

  let reverseWidth, reverseHeight

  if (width) {
    reverseWidth = width.slice().reverse()
  }
  if (height) {
    reverseHeight = height.slice().reverse()
  }

  const buildImageTag = (srcSet) => {
    const srcSetString = srcSet
      .map((url, index) => {
        if (index === 0) return `${url} ${mediaBreakpoints[index] + 1}w`
        return `${url} ${mediaBreakpoints[index - 1]}w`
      })
      .reverse()
      .join(', ')

    // srcSet is the LQIP image, src is the fallback image for older browsers
    // that do not support the 'srcSet' attribute (IE zero support)

    const srcString = cld.url(filePath(publicId), {
      transformation: 'unsupported',
      ...baseImageSettings,
    })

    if (lazyLoad) {
      imageClasses.push(styles['blurUp'])
    }

    return (
      <img
        key={`${uuidv4()}`}
        className={[styles.Image, ...imageClasses].join(' ')}
        src={srcString}
        srcSet={srcSetString}
        alt={alt}
      />
    )
  }

  const buildTags = () => {
    const dprSettings = ['1.0', '2.0', '3.0']
    let tags = []
    let imageSrcSet = []

    // We are expecting width/height attribute arrays in the order of
    // Phone/Tablet/Laptop/Desktop but we have to setup media queries
    // in the opposite order, so we reverse the arrays here.

    for (
      let breakpoint = 0;
      breakpoint < mediaBreakpoints.length;
      breakpoint++
    ) {
      const imageSettings = {
        ...baseImageSettings,
        ...(reverseWidth &&
          !!reverseWidth[breakpoint] && { width: reverseWidth[breakpoint] }),
        ...(reverseHeight &&
          !!reverseHeight[breakpoint] && { height: reverseHeight[breakpoint] }),
      }

      const srcsetData = dprSettings.map((dpr, indx) => {
        const sourceSettings = {
          ...imageSettings,
          dpr,
        }
        return cld.url(filePath(publicId), sourceSettings) + ` ${indx + 1}x`
      })

      const minMax = breakpoint < mediaBreakpoints.length - 1 ? `min` : `max`
      tags.push(
        <source
          key={`${uuidv4()}`}
          media={`(${minMax}-width: ${mediaBreakpoints[breakpoint]}px)`}
          data-srcset={srcsetData.join(', ')}
        />
      )

      const urlWithChainedTransformation = cld
        .imageTag(filePath(publicId), imageSettings)
        .transformation()
        .chain()
        .getParent()
        .getAttr('src')

      const urlWithChainedLqipTransformation = cld
        .imageTag(filePath(publicId), imageSettings)
        .transformation()
        .chain()
        .transformation('lqip')
        .getParent()
        .getAttr('src')

      if (lazyLoad) {
        imageSrcSet.push(urlWithChainedLqipTransformation)
      } else {
        imageSrcSet.push(urlWithChainedTransformation)
      }
    }

    tags.push(buildImageTag(imageSrcSet))
    return tags
  }

  const isSvg = (publicId) => {
    return publicId.split('.').pop() === 'svg'
  }

  const renderSvg = () => {
    const baseSvgSettings = {
      secure: true,
    }

    const svgUrl = cld.url(filePath(publicId), baseSvgSettings)
    return (
      <img
        data-src={svgUrl}
        className={[styles.Svg, ...imageClasses].join(' ')}
        alt={alt}
      />
    )
  }

  // Serve a simpler version if resource is SVG
  if (isSvg(publicId)) return renderSvg()

  return <picture>{buildTags()}</picture>
}

export const filePath = (publicId) => {
  if (!publicId) return ''
  const publicIdBase = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`
  return publicId.replace(publicIdBase, '')
}

CloudinaryImage.CROP_METHODS = {
  FILL: 'fill',
  FIT: 'fit',
  CROP: 'crop',
}

CloudinaryImage.PUBLIC_PROPS = {
  height: PropTypes.array,
  width: PropTypes.array,
  className: PropTypes.string,
  alt: PropTypes.string,
  publicId: PropTypes.string.isRequired,
  crop: PropTypes.oneOf(Object.values(CloudinaryImage.CROP_METHODS)),
  lazyLoad: PropTypes.bool,
}

CloudinaryImage.defaultProps = {
  crop: CloudinaryImage.CROP_METHODS.FILL,
  alt: '',
  lazyLoad: true,
}

CloudinaryImage.propTypes = CloudinaryImage.PUBLIC_PROPS
