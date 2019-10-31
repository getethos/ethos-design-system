import React from 'react'
import { CloudinaryImage } from './Images.js'
import renderer from 'react-test-renderer'

describe('CloudinaryImage', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(CloudinaryImage).toBeDefined()
      expect(CloudinaryImage.CROP_METHODS).toBeDefined()
      expect(CloudinaryImage.IMAGE_FILE_TYPES).toBeDefined()
    })
  })

  describe('default rendering', () => {
    test('CloudinaryImage', () => {
      const tree = renderer
        .create(
          <CloudinaryImage
            publicId ="something.com/otherthing.png"
            className="testImage"
            alt="alt text"
            width={[100,200,300,400]}
            height={[100,200,300,400]}
          />
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
