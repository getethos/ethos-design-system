import cloudinary, { Cloudinary } from 'cloudinary-core'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import useInvalid from '../../hooks/useInvalid.js'
import useRequired from '../../hooks/useRequired.js'
import { Media } from '../Media/Media'
import styles from './Images.module.scss'
// https://cloudinary.com/documentation/image_transformation_reference
export const CLOUDINARY_CLOUD_NAME = 'getethos'
// @ts-ignore
const cld: Cloudinary = new cloudinary.Cloudinary({
  cloud_name: CLOUDINARY_CLOUD_NAME,
})
const mediaBreakpoints = [
  Media.BREAKPOINTS.DESKTOP_RANGE_START,
  Media.BREAKPOINTS.LAPTOP_RANGE_START,
  Media.BREAKPOINTS.TABLET_RANGE_START,
  Media.BREAKPOINTS.PHONE_RANGE_END,
]
type CloudinaryImageProps = {
  height?: any[]
  width?: any[]
  className?: string
  alt?: string
  publicId: string
  crop?: any
}
const CROP_METHODS = {
  FILL: 'fill',
  FIT: 'fit',
  CROP: 'crop',
}
const PUBLIC_PROPS = {
  height: PropTypes.array,
  width: PropTypes.array,
  className: PropTypes.string,
  alt: PropTypes.string,
  publicId: PropTypes.string.isRequired,
  crop: PropTypes.oneOf(Object.values(CROP_METHODS)),
}
export const CloudinaryImage: React.FC<CloudinaryImageProps> & {
  CROP_METHODS: typeof CROP_METHODS
  PUBLIC_PROPS: typeof PUBLIC_PROPS
} = ({
  publicId,
  className,
  alt = '',
  width,
  height,
  crop = CROP_METHODS.FILL,
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
  const [includesInvalid] = useInvalid(Object.keys(PUBLIC_PROPS))
  includesInvalid(rest)
  const baseImageSettings = {
    quality: 'auto:eco',
    crop,
    secure: true,
    fetchFormat: 'auto',
    flags: ['progressive:semi'],
  }
  let imageClasses = ['lazyload', className]
  let reverseWidth, reverseHeight
  if (width) {
    reverseWidth = width.slice().reverse()
  }
  if (height) {
    reverseHeight = height.slice().reverse()
  }
  const buildImageTag = (srcSet: string[]) => {
    const srcSetString = srcSet
      .map((url, index) => {
        if (index === 0) return `${url} ${mediaBreakpoints[index] + 1}w`
        return `${url} ${mediaBreakpoints[index - 1]}w`
      })
      .reverse()
      .join(', ')
    // srcSet is the LQIP image, src is the fallback image for older browsers
    // that do not support the 'srcSet' attribute (IE zero support)
    return (
      <img
        key={`${uuidv4()}`}
        className={[styles.Image, styles['blurUp'], ...imageClasses].join(' ')}
        src={cld.url(filePath(publicId), {
          transformation: 'unsupported',
          ...baseImageSettings,
        })}
        srcSet={srcSetString}
        alt={alt}
      />
    )
  }
  const buildTags = () => {
    const dprSettings = ['1.0', '2.0', '3.0']
    let tags: JSX.Element[] = []
    let imageSrcSet: string[] = []
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
      // ethan - cloudinary typings are buggy so ignoring
      const urlWithChainedTransformation = cld
        .imageTag(filePath(publicId), imageSettings)
        .transformation()
        .chain()
        .transformation('lqip')
        // @ts-ignore
        .getParent()
        .getAttr('src') as string
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
CloudinaryImage.CROP_METHODS = CROP_METHODS
CloudinaryImage.PUBLIC_PROPS = PUBLIC_PROPS
