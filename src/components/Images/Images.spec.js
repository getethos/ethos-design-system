import React from 'react'
import { CloudinaryImage, preloadImageData } from './Images.js'
import * as Images from './Images'
import renderer from 'react-test-renderer'

describe('CloudinaryImage', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(CloudinaryImage).toBeDefined()
      expect(CloudinaryImage.CROP_METHODS).toBeDefined()
      expect(Images.CLOUDINARY_CLOUD_NAME).toBeDefined()
    })
  })

  describe('default rendering', () => {
    test('CloudinaryImage', () => {
      const tree = renderer
        .create(
          <CloudinaryImage
            publicId="something.com/otherthing.png"
            className="testImage"
            alt="alt text"
            width={[100, 200, 300, 400]}
            height={[100, 200, 300, 400]}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('non-lazy rendering, no data-srcset', () => {
    test('CloudinaryImage', () => {
      const tree = renderer
        .create(
          <CloudinaryImage
            publicId="something.com/otherthing.png"
            className="testImage"
            alt="alt text"
            width={[100, 200, 300, 400]}
            height={[100, 200, 300, 400]}
            lazyLoad={false}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('methods', () => {
    test('filePath', () => {
      expect(Images.CLOUDINARY_CLOUD_NAME).toBe('getethos')
      const path = Images.filePath(
        'https://res.cloudinary.com/getethos/image/upload/test/image.png'
      )
      expect(path).toBe('test/image.png')
    })
  })
})

describe('preloadImageData', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(preloadImageData).toBeDefined()
    })
  })

  describe('default rendering', () => {
    test('preloadImageData', () => {
      expect(
        preloadImageData({
          publicId: 'something.com/otherthing.png',
          crop: CloudinaryImage.CROP_METHODS.FILL,
          width: [100, 200, 300, 400],
          height: [100, 200, 300, 400],
        })
      ).toEqual([
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_1.0,f_auto,fl_progressive:semi,h_100,q_auto:eco,w_100/v1/something.com/otherthing.png',
          as: 'image',
          media: '(max-width: 599px) and (-webkit-max-device-pixel-ratio: 1.0)',
          key: '0-1.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_2.0,f_auto,fl_progressive:semi,h_100,q_auto:eco,w_100/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(max-width: 599px) and (-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: 2.0)',
          key: '0-2.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_3.0,f_auto,fl_progressive:semi,h_100,q_auto:eco,w_100/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(max-width: 599px) and (-webkit-min-device-pixel-ratio: 2.1) and (-webkit-max-device-pixel-ratio: 3.0)',
          key: '0-3.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_1.0,f_auto,fl_progressive:semi,h_200,q_auto:eco,w_200/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 600px) and (max-width: 899px) and (-webkit-max-device-pixel-ratio: 1.0)',
          key: '1-1.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_2.0,f_auto,fl_progressive:semi,h_200,q_auto:eco,w_200/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 600px) and (max-width: 899px) and (-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: 2.0)',
          key: '1-2.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_3.0,f_auto,fl_progressive:semi,h_200,q_auto:eco,w_200/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 600px) and (max-width: 899px) and (-webkit-min-device-pixel-ratio: 2.1) and (-webkit-max-device-pixel-ratio: 3.0)',
          key: '1-3.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_1.0,f_auto,fl_progressive:semi,h_300,q_auto:eco,w_300/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 900px) and (max-width: 1199px) and (-webkit-max-device-pixel-ratio: 1.0)',
          key: '2-1.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_2.0,f_auto,fl_progressive:semi,h_300,q_auto:eco,w_300/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 900px) and (max-width: 1199px) and (-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: 2.0)',
          key: '2-2.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_3.0,f_auto,fl_progressive:semi,h_300,q_auto:eco,w_300/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 900px) and (max-width: 1199px) and (-webkit-min-device-pixel-ratio: 2.1) and (-webkit-max-device-pixel-ratio: 3.0)',
          key: '2-3.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_1.0,f_auto,fl_progressive:semi,h_400,q_auto:eco,w_400/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 1200px) and (-webkit-max-device-pixel-ratio: 1.0)',
          key: '3-1.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_2.0,f_auto,fl_progressive:semi,h_400,q_auto:eco,w_400/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 1200px) and (-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: 2.0)',
          key: '3-2.0',
        },
        {
          rel: 'preload',
          href:
            'https://res.cloudinary.com/getethos/image/upload/c_fill,dpr_3.0,f_auto,fl_progressive:semi,h_400,q_auto:eco,w_400/v1/something.com/otherthing.png',
          as: 'image',
          media:
            '(min-width: 1200px) and (-webkit-min-device-pixel-ratio: 2.1) and (-webkit-max-device-pixel-ratio: 3.0)',
          key: '3-3.0',
        },
      ])
    })
  })
})
