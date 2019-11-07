import React from 'react'
import { CloudinaryImage } from './Images.js'
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
