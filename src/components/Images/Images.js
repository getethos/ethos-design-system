import React from 'react'
import PropTypes from 'prop-types'
import useRequired from '../../hooks/useRequired.js'
import useInvalid from '../../hooks/useInvalid.js'
import { createCloudinaryLegacyURL } from '@cloudinary/url-gen'
import { Media } from '../Media/Media'
import styles from './Images.module.scss'

// https://cloudinary.com/documentation/image_transformation_reference
export const CLOUDINARY_CLOUD_NAME = 'getethos'

const mediaBreakpoints = [
  Media.BREAKPOINTS.DESKTOP_RANGE_START,
  Media.BREAKPOINTS.LAPTOP_RANGE_START,
  Media.BREAKPOINTS.TABLET_RANGE_START,
  Media.BREAKPOINTS.PHONE_RANGE_END,
]

const mobileFirstMediaBreakpoints = [
  Media.BREAKPOINTS.PHONE_RANGE_END,
  Media.BREAKPOINTS.TABLET_RANGE_END,
  Media.BREAKPOINTS.LAPTOP_RANGE_END,
  Media.BREAKPOINTS.DESKTOP_RANGE_START,
]

const dprSettings = ['1.0', '2.0', '3.0']

const defaultImageSettings = {
  quality: 'auto:eco',
  secure: true,
  fetch_format: 'auto',
  flags: ['progressive:semi'],
  cloud_name: CLOUDINARY_CLOUD_NAME,
}

export const CloudinaryImage = ({
  publicId,
  className,
  alt,
  width,
  height,
  crop,
  lazyLoad,
  fetchpriority,
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
    crop,
    ...defaultImageSettings,
  }
  let imageClasses = [className]
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
    const srcString = createCloudinaryLegacyURL(filePath(publicId), {
      transformation: 'unsupported',
      ...baseImageSettings,
    })

    const imgProps = {
      key: publicId,
      className: [styles.Image, ...imageClasses].join(' '),
      src: srcString,
      srcSet: srcSetString,
      fetchpriority: fetchpriority,
    }

    if (lazyLoad) {
      Object.assign(imgProps, { loading: 'lazy' })
    }

    return <img alt={alt} {...imgProps} />
  }

  const buildTags = () => {
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
        return (
          createCloudinaryLegacyURL(filePath(publicId), sourceSettings) +
          ` ${indx + 1}x`
        )
      })

      const minMax = breakpoint < mediaBreakpoints.length - 1 ? `min` : `max`
      tags.push(
        <source
          key={`key-${breakpoint}`}
          media={`(${minMax}-width: ${mediaBreakpoints[breakpoint]}px)`}
          srcSet={srcsetData.join(', ')}
        />
      )

      const urlWithChainedTransformation = createCloudinaryLegacyURL(
        filePath(publicId),
        imageSettings
      )

      imageSrcSet.push(urlWithChainedTransformation)
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
      cloud_name: CLOUDINARY_CLOUD_NAME,
    }

    const svgUrl = createCloudinaryLegacyURL(
      filePath(publicId),
      baseSvgSettings
    )

    const imgProps = {
      key: publicId,
      src: svgUrl,
      className: [styles.Svg, ...imageClasses].join(' '),
      fetchpriority: fetchpriority,
    }

    if (lazyLoad) {
      Object.assign(imgProps, { loading: 'lazy' })
    }

    return <img className={styles.figure} alt={alt} {...imgProps} />
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

/**
 *  Sourced from here: https://web.dev/preload-responsive-images/#preload-and-lesspicturegreater
 *
 *  Output something like the below
 *  <link rel="preload" href="small_cat.jpg" as="image" media="(max-width: 400px)" />
 *  <link rel="preload" href="medium_cat.jpg" as="image" media="(min-width: 400.1px) and (max-width: 800px)" />
 *  <link rel="preload" href="large_cat.jpg" as="image" media="(min-width: 800.1px)" />
 *
 *  When Safari supports imagesrcset, rendering the tags in this manner will be unnecessary.
 *  We should just be able to drop the contents of a Cloudinary srcset into a tag
 *  <link rel="preload" as="image" imagesrcet="{srcsetString}" />
 */

export const preloadImageData = ({ crop, publicId, height, width }) => {
  const generatedTags = mobileFirstMediaBreakpoints.reduce((acc, curr, idx) => {
    const imageSettings = {
      ...defaultImageSettings,
      crop,
      ...(width && !!width[idx] && { width: width[idx] }),
      ...(height && !!height[idx] && { height: height[idx] }),
    }
    dprSettings.forEach((dpr) => {
      const sourceSettings = {
        ...imageSettings,
        dpr,
      }
      /* since we are going from 1.0 -> 3.0 here, use max */

      let minMaxString, dprString
      if (idx === 0) {
        minMaxString = `(max-width: ${curr}px)`
      } else if (idx === mobileFirstMediaBreakpoints.length - 1) {
        minMaxString = `(min-width: ${curr}px)`
      } else {
        minMaxString = `(min-width: ${mobileFirstMediaBreakpoints[idx - 1] +
          1}px) and (max-width: ${curr}px)`
      }

      if (dpr === '1.0') {
        dprString = `and (-webkit-max-device-pixel-ratio: ${dpr})`
      } else if (dpr === '2.0') {
        dprString = `and (-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: ${dpr})`
      } else {
        dprString = `and (-webkit-min-device-pixel-ratio: 2.1) and (-webkit-max-device-pixel-ratio: ${dpr})`
      }
      acc.push({
        rel: 'preload',
        href: createCloudinaryLegacyURL(filePath(publicId), sourceSettings),
        as: 'image',
        media: `${minMaxString} ${dprString}`,
        key: `${idx}-${dpr}`,
      })
    })
    return acc
  }, [])

  return generatedTags
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
  fetchpriority: PropTypes.oneOf(['high', 'low', 'auto']),
}

CloudinaryImage.defaultProps = {
  crop: CloudinaryImage.CROP_METHODS.FILL,
  alt: '',
  lazyLoad: true,
  fetchpriority: 'auto',
}

CloudinaryImage.propTypes = CloudinaryImage.PUBLIC_PROPS
